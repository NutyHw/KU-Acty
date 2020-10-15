# pull official base image
FROM node:14.9-alpine

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY ./package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# start app
CMD ["npm", "start"]
