FROM nodesource/sid:4.4.7

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138 && apt-get update && apt-get install git imagemagick -y apt-transport-https --allow-unauthenticated

ADD package.json package.json
RUN npm install

ADD . .

EXPOSE 9778
