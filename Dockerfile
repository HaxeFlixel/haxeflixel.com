FROM starefossen/node-imagemagick:4-6

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 9778