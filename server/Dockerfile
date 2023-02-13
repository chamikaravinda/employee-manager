# Use an official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's files to the container
COPY . .

# Expose the port to the host system
EXPOSE $PORT

# Specify the command to run when the container starts
CMD ["npm", "start"]
