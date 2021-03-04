FROM node:10-alpine

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
COPY . /usr/src/app/

RUN cd /usr/src/app/
RUN npm install

RUN apk del .gyp

RUN adduser -D myuser
USER myuser
CMD node index.js

EXPOSE 3000
EXPOSE 465

