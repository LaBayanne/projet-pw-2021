FROM node:16-alpine
RUN mkdir -p /app
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
