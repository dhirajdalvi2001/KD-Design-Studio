# Step 1: Use Node.js image to build the Vite app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest && npm install --legacy-peer-deps

# Cache npm dependencies
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create cache directories and set permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chmod -R 755 /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Expose port 80 and 443
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
