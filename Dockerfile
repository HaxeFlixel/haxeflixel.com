FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

RUN apt-get update && apt-get install -y imagemagick

RUN npm i

COPY . .

EXPOSE 9778
