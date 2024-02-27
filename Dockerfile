FROM node:20-alpine

WORKDIR /stockedup

COPY package*.json ./
COPY apps/ apps/
COPY packages/ packages/

RUN npm install

COPY turbo.json ./
COPY LICENSE ./

RUN npm run build

EXPOSE $PORT
EXPOSE 3000

CMD [ "npm", "start" ]
