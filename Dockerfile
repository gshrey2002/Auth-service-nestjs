# Dockerfile for Auth Service


FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .
RUN npm run build

EXPOSE 3000

ENV MONGO_URI=mongodb+srv://guptashrey163:hello@auth-service.2jtptsc.mongodb.net/
ENV JWT_SECRET=yourSecretKey


CMD ["npm", "run", "start"]
