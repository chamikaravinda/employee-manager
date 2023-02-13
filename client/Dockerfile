# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Set the environment to production
ENV NODE_ENV=production

# Expose the default Next.js port
EXPOSE $PORT

# Start the Next.js application
CMD ["npm", "start"]
