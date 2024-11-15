#!/bin/bash

# Navigate to project directory if not already there
if [ "$(pwd)" != "/home/ubuntu/kd-studio-fe" ]; then
  cd /home/ubuntu/kd-studio-fe
fi

# Pull latest changes from production branch
git checkout production
git pull origin production

# Stop and remove existing container
sudo docker stop react-frontend-container
sudo docker rm react-frontend-container

# Rebuild and run Docker container
sudo docker build -t react-frontend .
sudo docker run -d -p 80:80 --name react-frontend-container react-frontend

echo "Production updated successfully!"
