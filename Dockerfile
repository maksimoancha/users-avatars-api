FROM node:12.18.2

RUN mkdir -p /usr/src/main
WORKDIR /usr/src/main

ENV NPM_CONFIG_LOGLEVEL warn
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./ormconfig.json ./

RUN yarn
COPY . .
RUN yarn run build
CMD ["yarn", "start"]