# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application on port 3000
EXPOSE 8521

# Command to run the application
CMD ["npx", "nodemon"]