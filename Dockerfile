FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN chown -R node:node /usr/local/lib/node_modules
WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "start"]