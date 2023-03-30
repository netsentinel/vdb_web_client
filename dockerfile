FROM node:19-alpine as build

WORKDIR /app

COPY ./package.json ./package.json
COPY ./src ./src
COPY ./typings ./typings
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./declaration.d.ts ./declaration.d.ts

RUN npm i --no-audit --no-package-lock --force
RUN npm run build



FROM nginx:1.23-alpine as final

WORKDIR /usr/share/nginx/html
RUN rm -rf *

COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]