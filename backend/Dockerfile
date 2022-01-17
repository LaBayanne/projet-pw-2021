FROM node:12-alpine
RUN apk add --no-cache npm
COPY . .
RUN yarn install --production
RUN npm install
CMD ["npm", "start"]