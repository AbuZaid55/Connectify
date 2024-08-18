FROM node:20
WORKDIR /app/connectify/backend
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start" ]
