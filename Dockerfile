FROM node:4

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 9778
