# Use the official Node.js image as the base image
FROM node:22.17.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY app/package.json app/package-lock.json ./

# Copy the Prisma schema and other necessary files
COPY prisma ./prisma

# Install dependencies
RUN npm install

RUN npm run generate

EXPOSE 3000
EXPOSE 3001