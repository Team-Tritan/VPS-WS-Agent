FROM node:latest

COPY . .

RUN yarn 

RUN npm run build

EXPOSE 80

CMD ["node", "./dist/src/server/server.js"]