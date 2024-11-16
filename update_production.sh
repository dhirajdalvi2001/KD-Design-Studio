#!/bin/bash

# Pull latest changes from production branch
git checkout production
git stash
git pull origin production

# Stop and remove existing container
sudo docker stop react-frontend-container
sudo docker rm react-frontend-container

# Rebuild and run Docker container
sudo docker build -t react-frontend .
sudo docker run -d -p 80:80 --name react-frontend-container react-frontend

echo "Production updated successfully!"
