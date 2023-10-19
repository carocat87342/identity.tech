FROM node:16.13.1-alpine

COPY . /usr/src/id-be
COPY package-lock.json /usr/src/id-be

WORKDIR /usr/src/id-be

RUN apk update && apk --no-cache add --virtual native-deps g++ make cmake python3
    
RUN npm install

RUN apk del native-deps

RUN npm run build-deploy

EXPOSE 4000

CMD ["npm", "run", "dev"]
