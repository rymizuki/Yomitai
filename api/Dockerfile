FROM node:6.14.0-alpine

RUN apk update \
 && apk --no-cache --update add tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && apk del tzdata \
 && rm -fr /var/cache/apk/*

RUN npm install -g yarn
RUN npm install -g firebase-tools

WORKDIR /app

COPY ./functions /app/functions
COPY ./.firebaserc /app/.firebaserc
COPY ./firebase.json /app/firebase.json

WORKDIR /app/functions

RUN yarn install

WORKDIR /app

CMD ["firebase", "serve", "--port", "3000", "--only", "functions"]

EXPOSE 3000
