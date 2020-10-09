FROM node:12

# Create admin directory
WORKDIR /usr/src/admin

COPY . /usr/src/admin/

# If you are building your code for production
# RUN yarn --production
RUN yarn

# Builds the application
RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
