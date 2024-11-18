#!/bin/bash

echo "🚀 Starting production update..."

# Stop and remove existing container
echo "Stopping existing container..."
docker stop react-frontend-container || true
docker rm react-frontend-container || true

# Remove old image
echo "Removing old image..."
docker image rm react-frontend-image || true

# Build new image with optimized cache
echo "Building new image..."
DOCKER_BUILDKIT=1 docker build -t react-frontend-image .

# Run new container
echo "Starting new container..."
docker run -d \
  --name react-frontend-container \
  -p 80:80 \
  -p 443:443 \
  --restart unless-stopped \
  react-frontend-image

echo "✅ Update complete!"

