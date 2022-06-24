FROM node:4

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

COPY /usr/src/app/out ./out
COPY /usr/src/app/out/documentation/documentation/images ./out/documentation

EXPOSE 9778
