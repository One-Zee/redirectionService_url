FROM node:12

# App Directory
WORKDIR /code2

# ENV PORT 80

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV PORT=2222

# Expose port
EXPOSE 2222

# Run app
CMD [ "node", "server.js" ]