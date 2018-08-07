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

COPY ./src/nuxt/assets          /app/src/nuxt/assets
COPY ./src/nuxt/components      /app/src/nuxt/components
COPY ./src/nuxt/layouts         /app/src/nuxt/layouts
COPY ./src/nuxt/middleware      /app/src/nuxt/middleware
COPY ./src/nuxt/pages           /app/src/nuxt/pages
COPY ./src/nuxt/plugins         /app/src/nuxt/plugins
COPY ./src/nuxt/static          /app/src/nuxt/static
COPY ./src/nuxt/store           /app/src/nuxt/store
COPY ./src/nuxt/modules         /app/src/nuxt/modules
COPY ./src/nuxt/types           /app/src/nuxt/types
COPY ./nuxt.config.js           /app/nuxt.config.js
COPY ./.eslintrc.js             /app/.eslintrc.js
COPY ./tsconfig.json            /app/tsconfig.json

RUN npm run build

CMD ["npm", "run", "dev"]

EXPOSE 3000
