FROM node:10.5.0-alpine

RUN apk update \
 && apk --no-cache --update add tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && apk del tzdata \
 && rm -fr /var/cache/apk/*

WORKDIR /app

COPY ./package.json       /app/package.json
COPY ./package-lock.json  /app/package-lock.json

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3000
