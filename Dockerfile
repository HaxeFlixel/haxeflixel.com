FROM node:16-alpine3.15

COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 9778
