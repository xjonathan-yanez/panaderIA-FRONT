FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

# ===== Etapa 2: Production (Producción) =====
# Usamos una imagen de Nginx súper ligera para servir nuestro contenido estático.
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf.template
EXPOSE 8080

CMD ["/bin/sh",  "-c",  "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]