# Dockerfile for local development only
FROM node:22.12.0-slim

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm run test:setup

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]