import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database configuration
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'country_reports',
  user: 'postgres',
  password: 'postgres',
});

// Read and parse TypeScript data files
function parseDataFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract the data object from the TypeScript export
  // This is a simple parser - it looks for the export statement and extracts the object
  const match = content.match(/export const \w+DatasetData: DatasetScatterData = ({[\s\S]+});/);
  
  if (!match) {
    throw new Error(`Could not parse data from ${filePath}`);
  }
  
  // Remove TypeScript types and convert to valid JSON
  let jsonString = match[1]
    .replace(/'/g, '"')
    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
    .replace(/(\w+):/g, '"$1":'); // Quote property names
  
  return JSON.parse(jsonString);
}

async function importData() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Country codes to import
    const countries = ['AU', 'BW', 'CO', 'DK'];

    for (const countryCode of countries) {
      console.log(`\nImporting data for ${countryCode}...`);
      
      // Read the TypeScript file
      const dataFilePath = join(__dirname, '..', '..', 'ui', 'data', 'dataset-scatterplot', `${countryCode}.ts`);
      const data = parseDataFile(dataFilePath);
      
      // Insert dataset scatter data
      const insertScatterQuery = `
        INSERT INTO dataset_scatter_data (country_code, country_name, total_datasets, last_modified, data_source, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (country_code) DO UPDATE SET
          country_name = EXCLUDED.country_name,
          total_datasets = EXCLUDED.total_datasets,
          last_modified = EXCLUDED.last_modified,
          data_source = EXCLUDED.data_source,
          notes = EXCLUDED.notes
        RETURNING id;
      `;
      
      const scatterResult = await client.query(insertScatterQuery, [
        data.countryCode,
        data.countryName,
        data.totalDatasets,
        data.lastModified || null,
        data.dataSource || null,
        data.notes || null,
      ]);
      
      const scatterId = scatterResult.rows[0].id;
      console.log(`  Inserted/Updated scatter data with ID: ${scatterId}`);
      
      // Delete existing dataset points for this country (to handle updates)
      await client.query('DELETE FROM dataset_points WHERE dataset_scatter_id = $1', [scatterId]);
      
      // Insert dataset points in batches for better performance
      console.log(`  Importing ${data.datasets.length} dataset points...`);
      
      const insertPointQuery = `
        INSERT INTO dataset_points (id, name, species, occurrences, published_in_country, dataset_scatter_id)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      
      let imported = 0;
      for (const dataset of data.datasets) {
        await client.query(insertPointQuery, [
          dataset.id,
          dataset.name,
          dataset.species,
          dataset.occurrences,
          dataset.publishedInCountry,
          scatterId,
        ]);
        imported++;
        
        if (imported % 100 === 0) {
          console.log(`  Progress: ${imported}/${data.datasets.length}`);
        }
      }
      
      console.log(`  ✓ Successfully imported ${imported} dataset points for ${countryCode}`);
    }

    console.log('\n✅ All data imported successfully!');
    
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the import
importData().catch(console.error);
