FROM node:16-alpine3.15

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 9778
