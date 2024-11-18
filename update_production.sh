#!/bin/bash

export DOCKER_BUILDKIT=1

# Stop and remove existing container
sudo docker stop react-frontend-container || echo "Container not running"
sudo docker rm react-frontend-container || echo "Container not found"

# Rebuild Docker container
sudo docker build -t react-frontend . || { echo "Error during build"; exit 1; }

# Run the Docker container again
sudo docker run -d \
  --name react-frontend-container \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  react-frontend || { echo "Error during run"; sudo docker logs react-frontend-container; exit 1; }
sudo docker logs react-frontend-container
sudo docker ps
echo "Production updated successfully!"

