FROM node:18

WORKDIR /user/src/app
COPY . .

RUN npm install
CMD npm run serve