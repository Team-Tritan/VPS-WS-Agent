FROM node:latest

COPY . .

RUN yarn 

RUN cd src/server

EXPOSE 80

CMD ["ts-node", "server.ts"]