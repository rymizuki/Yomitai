FROM node:10.5.0-alpine

RUN apk update \
 && apk --no-cache --update add tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && apk del tzdata \
 && rm -fr /var/cache/apk/*

WORKDIR /app

COPY ./package.json       /app/package.json
COPY ./yarn.lock          /app/yarn.lock

COPY ./src                /app/src
COPY ./tsconfig.json      /app/tsconfig.json

RUN npm install -g yarn
RUN yarn install

CMD ["yarn", "dev"]

EXPOSE 3000
