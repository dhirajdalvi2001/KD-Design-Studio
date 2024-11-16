#!/bin/bash

# Pull latest changes from production branch
git checkout production
git stash
git pull origin production

# Stop and remove existing container
sudo docker stop react-frontend-container
sudo docker rm react-frontend-container

# Rebuild Docker container
sudo docker build -t react-frontend . || { echo "Error during build"; exit 1; }

# Run Docker container
# The -v flag mounts the host directory /etc/letsencrypt/live/kd-studio.in into the container at the same path.
# The :ro option ensures the files are mounted as read-only.
sudo docker run -d \
  --name react-frontend-container \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt/live/kd-studio.in:/etc/letsencrypt/live/kd-studio.in:ro \
  react-frontend
 || { echo "Error during run"; sudo docker logs react-frontend-container; exit 1; }


echo "Production updated successfully!"
