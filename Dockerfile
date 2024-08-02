FROM node:20 AS build

ADD . /app/

RUN cd /app && npm ci && npx next build

FROM nginx

COPY --from=build /app/out /usr/share/nginx/html
