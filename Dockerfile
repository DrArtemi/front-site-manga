FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
ENV VUE_APP_GRAPHQL_HTTP=https://fuckjapscan.com:8443/
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
VOLUME [ "/app/manga_covers/", "/etc/nginx/ssl/" ]
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf