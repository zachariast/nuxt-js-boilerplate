FROM node:12

RUN mkdir -p /usr/src/admin
WORKDIR /usr/src/admin

COPY . /usr/src/admin/

RUN yarn 

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
