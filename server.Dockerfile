FROM node:latest

COPY . .

RUN npm i -g yarn

RUN yarn 

RUN cd src/server

EXPOSE 80

CMD ["ts-node", "server.ts"]