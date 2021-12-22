FROM node:12-alpine
RUN apk add --no-cache postgresql postgresql-client npm
WORKDIR .
COPY . .
RUN yarn install --production
CMD ["node", "frontend/src/index.js"]
