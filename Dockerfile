FROM node:lts

WORKDIR /opt/1podnat

RUN npm i -g @nestjs/cli

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]