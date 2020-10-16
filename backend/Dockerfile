FROM node:14.9-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN mkdir /data/
RUN npm install
ENV NODE_ENV=${NODE_ENV}
COPY . .
EXPOSE 3000
