FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:lts-alpine AS deploy
WORKDIR /home/static
COPY --from=build /usr/src/app/ ./
RUN adduser -D static; chown -R static /home/static
USER static
EXPOSE 8070
CMD ["npm", "start"]