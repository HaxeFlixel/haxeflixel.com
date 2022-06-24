FROM nodesource/sid:4.4.7

# RUN apt-get update && apt-get install git imagemagick -y --allow-unauthenticated

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 9778
