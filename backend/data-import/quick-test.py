import requests
import json

# API endpoint
API_BASE = "http://localhost:8081/api"

# Sample data for Australia (just a few datasets for testing)
sample_data = {
    "countryCode": "AU",
    "countryName": "Australia",
    "totalDatasets": 3485,
    "lastModified": "2025-10-22",
    "dataSource": "GBIF",
    "notes": "Biodiversity datasets from Australia institutions and GBIF network",
    "datasets": [
        {
            "id": "02abb9d1-7d81-42b3-ac9a-3b3d0c7a5280",
            "name": "Fungimap",
            "species": 1474,
            "occurrences": 148551,
            "publishedInCountry": True
        },
        {
            "id": "03ce64e0-7906-465f-afa8-1bfb6597aeaa",
            "name": "QLD DERM Coastal Bird Atlas (Trial)",
            "species": 370,
            "occurrences": 60507,
            "publishedInCountry": True
        },
        {
            "id": "040c5662-da76-4782-a48e-cdea1892d14c",
            "name": "International Barcode of Life project (iBOL)",
            "species": 11675,
            "occurrences": 415905,
            "publishedInCountry": False
        }
    ]
}

try:
    # Create the dataset
    response = requests.post(f"{API_BASE}/dataset-scatter", json=sample_data)
    response.raise_for_status()
    
    print(f"✅ Successfully created dataset scatter data for {sample_data['countryName']}")
    print(f"Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    
    # Test retrieving it
    print("\n🔍 Testing GET endpoint...")
    get_response = requests.get(f"{API_BASE}/dataset-scatter/country/AU")
    get_response.raise_for_status()
    print(f"✅ Successfully retrieved data!")
    print(f"Found {len(get_response.json()['datasets'])} datasets")
    
except requests.exceptions.RequestException as e:
    print(f"❌ Error: {e}")
    if hasattr(e.response, 'text'):
        print(f"Response: {e.response.text}")
