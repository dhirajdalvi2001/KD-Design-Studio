#!/bin/bash

echo "🚀 Starting production update..."

# Stop and remove existing container
echo "Stopping existing container..."
docker stop frontend-container || true
docker rm frontend-container || true

# Remove old image
echo "Removing old image..."
docker image rm frontend-image || true

# Build new image with optimized cache
echo "Building new image..."
DOCKER_BUILDKIT=1 docker build -t frontend-image --no-cache .

# Run new container
echo "Starting new container..."
docker run -d \
  --name frontend-container \
  -p 80:80 \
  -p 443:443 \
  --restart unless-stopped \
  frontend-image

echo "✅ Update complete!"

