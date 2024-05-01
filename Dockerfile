FROM node:22
RUN mkdir -p /usr/src/test-task
WORKDIR /usr/src/test-task

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
