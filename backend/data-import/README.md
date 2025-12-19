# Dataset Import Script

This directory contains scripts to import dataset scatter plot data from TypeScript files into the PostgreSQL database.

## Prerequisites

- PostgreSQL database running (via Docker Compose or locally)
- Node.js **OR** Python 3.x installed

## Setup

### Option 1: Node.js Script

1. Install dependencies:
```bash
npm install
```

### Option 2: Python Script

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Database Setup

2. Make sure PostgreSQL is running:
```bash
# From project root
docker-compose up postgres
```

Or ensure the database is accessible at `localhost:5432` with credentials:
- Database: `country_reports`
- Username: `postgres`
- Password: `postgres`

## Running the Import

### Using Node.js:
```bash
npm run import
```

### Using Python:
```bash
python import-data.py
```

This will:
1. Connect to the PostgreSQL database
2. Read data from TypeScript files in `ui/data/dataset-scatterplot/`
3. Import data for AU, BW, CO, and DK countries
4. Create/update dataset scatter records
5. Import all dataset points for each country

## What Gets Imported

- **Dataset Scatter Data**: Country-level metadata including:
  - Country code and name
  - Total datasets count
  - Last modified date
  - Data source
  - Notes

- **Dataset Points**: Individual datasets including:
  - Dataset ID and name
  - Species count
  - Occurrences count
  - Published in country flag

## Notes

- The script uses `ON CONFLICT` to handle updates - re-running it will update existing records
- Dataset points are deleted and re-imported for each country to ensure data consistency
- Progress is logged every 100 records during import
