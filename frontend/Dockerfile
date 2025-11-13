# frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the Vite app
RUN npm run build

# Serve the production build with Nginx
FROM nginx:alpine

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files (Vite outputs to /app/dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port you want to use (5333)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
