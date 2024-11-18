# Step 1: Use Node.js image to build the Vite app
FROM node:18-alpine as build

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Use npm ci instead of install, and clean npm cache
RUN npm install -g npm@latest && \
    npm ci --legacy-peer-deps && \
    npm cache clean --force

# Copy only necessary files
COPY src/ ./src/
COPY public/ ./public/
COPY index.html vite.config.js .env* ./

# Build the app
RUN npm run build

# Step 2: Use Nginx with multi-stage build
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy only the built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configure nginx in a single RUN to reduce layers
RUN mkdir -p /var/cache/nginx/client_temp && \
    chmod -R 755 /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    # Optimize nginx
    sed -i 's/worker_processes  1/worker_processes  auto/' /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
