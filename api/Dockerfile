FROM node:10.15.1

# create destination directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# copy the app, note .dockerignore
COPY . /usr/src/api/

# install dependencies
RUN yarn

EXPOSE 3000

# start the app
CMD [ "node", "." ]
