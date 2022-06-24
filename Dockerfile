FROM nodesource/sid:4.4.7

RUN apt-get update && apt-get install git imagemagick -y apt-get autoremove apt-transport-https --allow-unauthenticated

ADD package.json package.json
RUN npm install

ADD . .

EXPOSE 9778
