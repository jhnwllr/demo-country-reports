#!/bin/bash
cd /mnt/c/Users/ftw712/Desktop/packages/demo-country-reports
echo "Building Docker images..."
docker-compose build
echo "Starting Docker services..."
docker-compose up
