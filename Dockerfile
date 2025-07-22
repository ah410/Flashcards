# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy all source code
COPY . .

# Build the Vite app
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Serve the dist folder as a static site
CMD ["serve", "-s", "dist"]

# Expose port
EXPOSE 3000