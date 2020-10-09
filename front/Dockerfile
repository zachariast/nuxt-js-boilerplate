FROM node:10

# # create destination directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # copy the app, note .dockerignore
# COPY . /usr/src/app/
# RUN yarn install

# # build necessary, even if no static files are needed,
# # since it builds the server as well
# # RUN yarn build

# # expose 5000 on container
# EXPOSE 5000

# # set app serving to permissive / assigned
# # ENV NUXT_HOST=0.0.0.0

# # set app port
# ENV NUXT_PORT=3000

# # start the app
# CMD [ "yarn", "start" ]

# Create app directory
WORKDIR /usr/src/app/
ADD . /usr/src/app/

RUN rm yarn.lock
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start" ]