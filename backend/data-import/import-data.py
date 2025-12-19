import psycopg2
import json
import re
from pathlib import Path

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'port': 5433,
    'database': 'country_reports',
    'user': 'postgres',
    'password': 'postgres'
}

def parse_ts_file(file_path):
    """Parse TypeScript file and extract the data object."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the export statement and extract the object
    match = re.search(r'export const \w+DatasetData: DatasetScatterData = ({[\s\S]+});', content)
    
    if not match:
        raise ValueError(f"Could not parse data from {file_path}")
    
    # Extract the object string
    obj_string = match.group(1)
    
    # More robust conversion from TypeScript to JSON
    # Remove comments
    obj_string = re.sub(r'//.*?$', '', obj_string, flags=re.MULTILINE)
    obj_string = re.sub(r'/\*.*?\*/', '', obj_string, flags=re.DOTALL)
    
    # Replace single quotes with double quotes (but not in escaped strings)
    obj_string = obj_string.replace("'", '"')
    
    # Remove trailing commas before closing brackets
    obj_string = re.sub(r',(\s*[}\]])', r'\1', obj_string)
    
    # Quote unquoted property names - be more careful
    obj_string = re.sub(r'(\w+)(\s*):', r'"\1"\2:', obj_string)
    
    # Handle boolean values
    obj_string = obj_string.replace('true', 'true').replace('false', 'false')
    
    try:
        return json.loads(obj_string)
    except json.JSONDecodeError as e:
        # If parsing fails, save the problematic content for debugging
        with open('debug_output.txt', 'w', encoding='utf-8') as f:
            f.write(obj_string)
        raise ValueError(f"Failed to parse JSON. Debug output saved to debug_output.txt. Error: {e}")

def import_country_data(cursor, data):
    """Import data for a single country."""
    print(f"\nImporting data for {data['countryCode']}...")
    
    # Insert dataset scatter data
    cursor.execute("""
        INSERT INTO dataset_scatter_data (country_code, country_name, total_datasets, last_modified, data_source, notes)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (country_code) DO UPDATE SET
            country_name = EXCLUDED.country_name,
            total_datasets = EXCLUDED.total_datasets,
            last_modified = EXCLUDED.last_modified,
            data_source = EXCLUDED.data_source,
            notes = EXCLUDED.notes
        RETURNING id;
    """, (
        data['countryCode'],
        data['countryName'],
        data['totalDatasets'],
        data.get('lastModified'),
        data.get('dataSource'),
        data.get('notes')
    ))
    
    scatter_id = cursor.fetchone()[0]
    print(f"  Inserted/Updated scatter data with ID: {scatter_id}")
    
    # Delete existing dataset points
    cursor.execute('DELETE FROM dataset_points WHERE dataset_scatter_id = %s', (scatter_id,))
    
    # Insert dataset points
    datasets = data['datasets']
    print(f"  Importing {len(datasets)} dataset points...")
    
    for i, dataset in enumerate(datasets, 1):
        cursor.execute("""
            INSERT INTO dataset_points (id, name, species, occurrences, published_in_country, dataset_scatter_id)
            VALUES (%s, %s, %s, %s, %s, %s);
        """, (
            dataset['id'],
            dataset['name'],
            dataset['species'],
            dataset['occurrences'],
            dataset['publishedInCountry'],
            scatter_id
        ))
        
        if i % 100 == 0:
            print(f"  Progress: {i}/{len(datasets)}")
    
    print(f"  ✓ Successfully imported {len(datasets)} dataset points for {data['countryCode']}")

def main():
    """Main import function."""
    # Country codes to import
    countries = ['AU', 'BW', 'CO', 'DK']
    
    # Connect to database
    conn = psycopg2.connect(**DB_CONFIG)
    conn.autocommit = False
    cursor = conn.cursor()
    
    try:
        print('Connected to PostgreSQL database')
        
        # Get the path to the data files
        script_dir = Path(__file__).parent
        data_dir = script_dir.parent.parent / 'ui' / 'data' / 'dataset-scatterplot'
        
        for country_code in countries:
            file_path = data_dir / f'{country_code}.ts'
            
            if not file_path.exists():
                print(f"Warning: File not found: {file_path}")
                continue
            
            # Parse and import data
            data = parse_ts_file(file_path)
            import_country_data(cursor, data)
        
        # Commit all changes
        conn.commit()
        print('\n✅ All data imported successfully!')
        
    except Exception as e:
        conn.rollback()
        print(f'\n❌ Error importing data: {e}')
        raise
    
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    main()
