FROM node:16-alpine

WORKDIR /app

COPY package* /app/

COPY . /app

RUN npm install

CMD ["node", "app.js"]

