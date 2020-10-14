FROM node:14.9-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN mkdir /data/
RUN npm install
COPY . .
EXPOSE 3000
