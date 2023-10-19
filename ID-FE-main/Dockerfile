FROM node:16.13.1-alpine
RUN apk add --no-cache autoconf

WORKDIR /usr/src/id-fe
COPY . /usr/src/id-fe
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
