FROM registry.access.redhat.com/ubi9/nodejs-20 AS build
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM registry.access.redhat.com/ubi9/nginx-124
COPY --from=build /opt/app-root/src/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 1001
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
