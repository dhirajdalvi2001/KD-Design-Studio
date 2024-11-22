# Step 1: Use Node.js alpine image to reduce base image size
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./

# Install dependencies with clean npm cache and production-only deps
RUN npm install -g npm@latest && \
    npm ci --legacy-peer-deps --production && \
    npm cache clean --force

# Update Browserslist database
RUN npx update-browserslist-db@latest

# Copy only necessary files, excluding dev files
COPY . .

# Build with optimizations and cleanup
RUN npm run build -- --max-old-space-size=4096 && \
    rm -rf node_modules

# Step 2: Use lightweight Nginx alpine
FROM nginx:alpine

# Remove default nginx static assets and clean apk cache
RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /var/cache/apk/*

# Copy only the built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create cache directories with proper permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chmod -R 755 /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
