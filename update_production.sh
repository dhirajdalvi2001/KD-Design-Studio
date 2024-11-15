#!/bin/bash

# Navigate to project directory if not already there
if [ "$(pwd)" != "$HOME/kd-studio-fe" ]; then
  cd ~/kd-studio-fe
fi

# Pull latest changes from production branch
git checkout production
git pull origin production

# Stop and remove existing container
docker stop react-frontend-container
docker rm react-frontend-container

# Rebuild and run Docker container
docker build -t react-frontend .
docker run -d -p 80:80 --name react-frontend-container react-frontend

echo "Production updated successfully!"
