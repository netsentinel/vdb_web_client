FROM alpine:3 AS base


FROM node:19-alpine as build

WORKDIR /app

COPY ./package.json ./package.json
RUN npm i --no-audit --no-package-lock --force

COPY ./src ./src
COPY ./typings ./typings
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./declaration.d.ts ./declaration.d.ts
RUN npm run build



FROM base as final

RUN apk add -q --no-progress nginx

WORKDIR /usr/share/nginx/html
RUN rm -rf *

COPY --from=build /app/build /usr/share/nginx/html
COPY ./build_alpine/pre-nginx.conf/ /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]