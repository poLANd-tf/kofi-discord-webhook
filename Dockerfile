FROM node:26 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev --ignore-scripts

FROM gcr.io/distroless/nodejs26-debian13
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]