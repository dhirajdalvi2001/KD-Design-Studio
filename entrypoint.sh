#!/bin/bash

# Navigate to the project directory
cd /home/ec2-user/kd-studio/Frontend || exit

# Pull the latest changes from the main branch
echo "Pulling latest code..."
git pull origin main

# Build the Docker image
echo "Building Docker image..."
docker build -t kd-studio .

# Stop and remove the existing container (if running)
echo "Stopping and removing existing container..."
docker stop kd-studio-container || true
docker rm kd-studio-container || true

# Run the new container
echo "Starting new container..."
docker run -d -p 80:80 --name kd-studio-container kd-studio

echo "Deployment successful!"
# 