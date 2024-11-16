#!/bin/bash

# Navigate to project directory if not already there
if [ "$(pwd)" != "/home/ubuntu/kd-studio-fe" ]; then
  cd /home/ubuntu/kd-studio-fe || { echo "Failed to navigate to /home/ubuntu/kd-studio-fe"; exit 1; }
fi

# Pull latest changes from production branch
git checkout production
git pull origin production || { echo "Git pull failed"; exit 1; }

# Check if the container exists and stop it
existing_container=$(sudo docker ps -aq -f name=react-frontend-container)

if [ -n "$existing_container" ]; then
  echo "Stopping existing container..."
  sudo docker stop react-frontend-container || { echo "Failed to stop existing container"; exit 1; }
  
  echo "Removing existing container..."
  sudo docker rm react-frontend-container || { echo "Failed to remove existing container"; exit 1; }
else
  echo "No existing container found."
fi

# Rebuild Docker image
echo "Building new Docker image..."
sudo docker build -t react-frontend . || { echo "Docker build failed"; exit 1; }

# Run the new container
echo "Running the new Docker container..."
sudo docker run -d -p 80:80 --name react-frontend-container react-frontend || { echo "Failed to start new container"; exit 1; }

echo "Production updated successfully!"
