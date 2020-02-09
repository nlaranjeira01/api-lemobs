FROM node:12.14-alpine
WORKDIR /usr/app
COPY package*.json ./
# problemas com python na hora de instalar os pacotes
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm ci
COPY . .
CMD ["nmp", "run", "start:prod"]