# Country Reports Backend

Spring Boot backend service for the Country Reports application.

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- PostgreSQL 15
- Maven
- Docker

## Prerequisites

- Docker and Docker Compose
- Java 17 (for local development without Docker)
- Maven 3.9+ (for local development without Docker)

## Running with Docker

1. From the root directory of the project, run:
```bash
docker-compose up --build
```

This will start both the PostgreSQL database and the Spring Boot backend.

- Backend API: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs
- PostgreSQL: localhost:5432

## Running Locally (without Docker)

1. Make sure PostgreSQL is running locally on port 5432

2. Build the project:
```bash
cd backend
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

## API Documentation

The API is documented using **Swagger/OpenAPI 3.0**. Once the application is running, you can:

### View Interactive API Documentation
Visit: **http://localhost:8080/swagger-ui.html**

The Swagger UI provides:
- 📝 Complete API documentation with request/response examples
- 🧪 Interactive testing - try out API endpoints directly from the browser
- 📊 Schema definitions for all data models
- 🔍 Search and filter capabilities

### Access OpenAPI Specification
- JSON format: http://localhost:8080/api-docs
- YAML format: http://localhost:8080/api-docs.yaml

## API Endpoints

### Countries

- `GET /api/countries` - Get all countries
- `GET /api/countries/{id}` - Get country by ID
- `GET /api/countries/code/{code}` - Get country by code (e.g., AU, BW, CO, DK)
- `POST /api/countries` - Create a new country
- `PUT /api/countries/{id}` - Update a country
- `DELETE /api/countries/{id}` - Delete a country

### Dataset Scatter Plot Data

- `GET /api/dataset-scatter` - Get all dataset scatter data
- `GET /api/dataset-scatter/{id}` - Get dataset scatter data by ID
- `GET /api/dataset-scatter/country/{countryCode}` - Get dataset scatter data for a specific country
- `GET /api/dataset-scatter/available-countries` - Get list of available country codes
- `GET /api/dataset-scatter/has-data/{countryCode}` - Check if data exists for a country
- `POST /api/dataset-scatter` - Create new dataset scatter data
- `PUT /api/dataset-scatter/{id}` - Update dataset scatter data
- `DELETE /api/dataset-scatter/{id}` - Delete dataset scatter data

## Database Configuration

Default configuration (can be overridden with environment variables):

- Database: `country_reports`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

## Development

The application uses Hibernate with `ddl-auto: update`, so tables will be created automatically on startup.

### Importing Data from TypeScript Files

To import the dataset scatter plot data from the frontend TypeScript files:

1. Make sure PostgreSQL is running:
```bash
docker-compose up postgres
```

2. Navigate to the data-import directory and install dependencies:
```bash
cd backend/data-import
npm install
```

3. Run the import script:
```bash
npm run import
```

This will import all dataset scatter plot data for AU, BW, CO, and DK countries from the TypeScript files in `ui/data/dataset-scatterplot/`.

### Adding Sample Data

You can add sample data by creating a `DataLoader` component or by making POST requests to the API:

```bash
curl -X POST http://localhost:8080/api/countries \
  -H "Content-Type: application/json" \
  -d '{"code": "AU", "name": "Australia", "description": "Country report for Australia"}'
```
