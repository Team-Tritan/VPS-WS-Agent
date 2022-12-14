FROM node:latest

COPY . .

RUN yarn 

RUN npm run build

EXPOSE 80

CMD ["node", "./dist/server/server.js"]