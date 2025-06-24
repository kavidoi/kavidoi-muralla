# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY muralla-dashboard/package*.json ./muralla-dashboard/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd muralla-dashboard && npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start:production"]
