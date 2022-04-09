FROM node:16-alpine

WORKDIR /app

COPY package* /app/

COPY . /app

CMD ["node", "app.js"]

