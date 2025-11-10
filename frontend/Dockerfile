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

# Copy built files (Vite outputs to /app/dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port you want to use (5333)
EXPOSE 5333

CMD ["nginx", "-g", "daemon off;"]
