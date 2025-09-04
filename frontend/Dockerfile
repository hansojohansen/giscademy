FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# Kjør Vite-devserver og lytt på alle interfaces
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","3000"]
