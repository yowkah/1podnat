FROM node:lts

WORKDIR /opt/1podnat

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm install -g @nestjs/cli

RUN nest update

RUN npm run build

CMD ["nest", "start", " -w"]