FROM node:10.3.0-alpine

RUN apk update \
 && apk --no-cache --update add tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && apk del tzdata \
 && rm -fr /var/cache/apk/*

WORKDIR /app

COPY ./package.json       /app/package.json
COPY ./package-lock.json  /app/package-lock.json

RUN npm install

COPY ./assets         /app/assets
COPY ./components     /app/components
COPY ./layouts        /app/layouts
COPY ./middleware     /app/middleware
COPY ./pages          /app/pages
COPY ./plugins        /app/plugins
COPY ./static         /app/static
COPY ./store          /app/store
COPY ./nuxt.config.js /app/nuxt.config.js

COPY ./modules        /app/modules
COPY ./tsconfig.json  /app/tsconfig

CMD ["npm", "run", "dev"]

EXPOSE 3000
