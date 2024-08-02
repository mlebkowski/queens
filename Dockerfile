FROM node:20 AS build

ADD src \
    public \
    .eslintrc.json \
    next.config.mjs \
    tsconfig.json \
    package.json \
    package-lock.json \
    /app/

RUN cd /app && npm ci && npx next build

FROM nginx

COPY --from=build /app/out /usr/share/nginx/html
