# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy the Prisma schema and other necessary files
COPY prisma ./prisma

# Install dependencies
RUN npm install