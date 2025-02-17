FROM node:20-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install
RUN yarn build

FROM node:20-alpine

RUN apk --no-cache add curl
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV LISTEN_PORT=80
EXPOSE $LISTEN_PORT

COPY --from=builder /usr/src/app/.env* ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/main" ]
