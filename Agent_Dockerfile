FROM node:latest

COPY . .

RUN npm i -g yarn

RUN yarn 

RUN cd src/client

CMD ["ts-node", "agent.ts"]