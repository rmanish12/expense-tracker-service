FROM node:18.16-alpine3.17

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]