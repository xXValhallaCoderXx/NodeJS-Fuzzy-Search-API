FROM node:carbon

# Set the working directory
WORKDIR /usr/app
# Copy package.json to working dir
COPY package.json .
# Install node modules
RUN npm install --quiet
# Copy all files from
COPY . .