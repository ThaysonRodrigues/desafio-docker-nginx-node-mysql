FROM node:15
WORKDIR /app
COPY app.js .
RUN npm install
RUN npm install express
RUN npm install mysql2
EXPOSE 3000
ENTRYPOINT [ "node", "app.js" ]