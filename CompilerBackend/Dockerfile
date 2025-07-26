FROM node:22
WORKDIR /app
RUN apt-get update &&\
 apt-get install -y g++ gcc openjdk-17-jdk python3

COPY . .
RUN npm i
EXPOSE 5000
CMD ["node","index.js"]