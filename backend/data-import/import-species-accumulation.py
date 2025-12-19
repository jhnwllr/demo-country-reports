#!/usr/bin/env python3
"""
Import species accumulation data from TypeScript files to backend API
Usage: python import-species-accumulation.py
"""

import json
import requests
import sys
import re
from pathlib import Path

# Configuration
API_BASE = "http://localhost:8081/api/species-accumulation"
UI_DATA_PATH = Path(__file__).parent.parent.parent / "ui" / "data" / "species-accumulation"

def parse_ts_file(file_path):
    """Parse TypeScript file and extract data"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove export statement and variable declaration
    content = re.sub(r'export\s+const\s+\w+:\s*\w+\s*=\s*', '', content)
    content = content.strip().rstrip(';')
    
    # Convert TypeScript to JSON
    # Remove type annotations
    content = re.sub(r':\s*CountryAccumulationData', '', content)
    content = re.sub(r':\s*TaxonomicGroupAccumulation\[\]', '', content)
    content = re.sub(r':\s*AccumulationDataPoint\[\]', '', content)
    
    # Parse as JSON
    try:
        data = json.loads(content)
        return data
    except json.JSONDecodeError as e:
        print(f"Error parsing {file_path}: {e}")
        # Try with eval as fallback
        try:
            data = eval(content)
            return data
        except Exception as e2:
            print(f"Error with eval: {e2}")
            return None

def get_existing(country_code: str):
    """Check if dataset exists for country"""
    url = f"{API_BASE}/country/{country_code}"
    r = requests.get(url)
    if r.status_code == 200:
        return r.json()
    if r.status_code == 404:
        return None
    r.raise_for_status()

def create_accumulation(data: dict):
    """Create new species accumulation data"""
    url = API_BASE
    r = requests.post(url, json=data)
    r.raise_for_status()
    return r.json()

def update_accumulation(id: int, data: dict):
    """Update existing species accumulation data"""
    url = f"{API_BASE}/{id}"
    r = requests.put(url, json=data)
    r.raise_for_status()
    return r.json()

def main():
    # Process all country files
    countries = ['AU', 'BW', 'CO', 'DK']
    
    for country_code in countries:
        ts_file = UI_DATA_PATH / f"{country_code}.ts"
        
        if not ts_file.exists():
            print(f"File not found: {ts_file}")
            continue
        
        print(f"\nProcessing {country_code}...")
        
        # Parse TypeScript file
        data = parse_ts_file(ts_file)
        if not data:
            print(f"Failed to parse {ts_file}")
            continue
        
        print(f"  Country: {data['countryName']}")
        print(f"  Taxonomic groups: {len(data['taxonomicGroups'])}")
        
        # Check if exists
        existing = get_existing(country_code)
        
        if existing:
            print(f"  Updating existing entry (ID: {existing['id']})...")
            try:
                result = update_accumulation(existing['id'], data)
                print(f"  ✓ Updated successfully")
            except Exception as e:
                print(f"  ✗ Error updating: {e}")
        else:
            print(f"  Creating new entry...")
            try:
                result = create_accumulation(data)
                print(f"  ✓ Created successfully (ID: {result['id']})")
            except Exception as e:
                print(f"  ✗ Error creating: {e}")
    
    print("\n✓ Import complete!")

if __name__ == "__main__":
    main()
