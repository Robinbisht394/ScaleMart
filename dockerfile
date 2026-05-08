# Use official Node image
FROM node:20

# Create app directory
WORKDIR /scaleMart

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "index.js"]