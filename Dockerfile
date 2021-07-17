FROM node:lts

WORKDIR /opt/1podnat

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]