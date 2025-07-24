# Etapa 1: Compilar la aplicación de React
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.27-alpine-slim AS production

# Cloud Run espera que el contenedor escuche en el puerto definido por la variable de entorno PORT
# Nginx por defecto escucha en el puerto 80.
# No es estrictamente necesario exponer el puerto en el Dockerfile para Cloud Run,
# pero es una buena práctica para la documentación y el uso local.
EXPOSE 8080

# Copiar los archivos de compilación de la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]