FROM node:16-alpine
RUN mkdir -p /app
RUN mkdir -p /app/backend
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start"]