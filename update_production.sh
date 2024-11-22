#!/bin/bash

# Pull the latest changes from git
git pull

# Build and restart the containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Clean up unused images
docker image prune -f

echo "Deployment completed successfully!"

