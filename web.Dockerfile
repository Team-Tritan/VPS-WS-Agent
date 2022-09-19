FROM node:latest

COPY . .

RUN yarn 

RUN npm run build

CMD ["node", "./dist/web/server.js"]