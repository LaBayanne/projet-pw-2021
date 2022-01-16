FROM node:12-alpine
RUN apk add --no-cache npm
WORKDIR frontend
COPY . .
RUN yarn install --production
RUN npm install
CMD ["npm", "start"]
