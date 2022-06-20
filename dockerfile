FROM node:16

#set timezone to EST
ENV TZ=America/New_York

WORKDIR /uw_cafeteria_api/src/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]