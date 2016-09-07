FROM nodesource/jessie:4.4.7

RUN apt-get update && apt-get install git imagemagick -y

ADD package.json package.json
RUN npm install

ADD . .

RUN npm run build-production

EXPOSE 9778