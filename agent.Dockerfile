FROM node:latest

COPY . .

RUN yarn 

RUN cd src/client

CMD ["ts-node", "agent.ts"]