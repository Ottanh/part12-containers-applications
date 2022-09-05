# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage
WORKDIR /usr/src/app
ENV REACT_APP_BACKEND_URL=http://localhost:3001/
ENV CI=true
COPY . .

RUN npm ci

RUN npm run build


FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html