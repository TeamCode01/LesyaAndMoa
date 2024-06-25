FROM node:20.14.0-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD tail -f /dev/null
