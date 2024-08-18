FROM node:20
WORKDIR /app/connectify/frontend
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
