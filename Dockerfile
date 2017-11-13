FROM node:8.9.1-alpine
WORKDIR /deploy
COPY . /deploy
RUN yarn install
