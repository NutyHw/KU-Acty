FROM node:14.9-alpine
WORKDIR /usr/app/
COPY ./src/ /usr/app/src/
COPY ./package.json .
COPY ./tsconfig.build.json .
COPY ./tsconfig.json .
RUN npm install
RUN mkdir /data/
ENV NODE_ENV=${NODE_ENV}
EXPOSE 3000
