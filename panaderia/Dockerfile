# ===== Etapa 1: Build (Construcción) =====
# Usamos una imagen oficial de Node.js como base.
# 'alpine' es una versión ligera, ideal para mantener el tamaño bajo.
# Nombramos esta etapa como 'builder' para referenciarla luego.
FROM node:22 AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias.
# Copiamos package.json Y package-lock.json (o yarn.lock)
# El asterisco (*) asegura que ambos archivos sean copiados.
COPY package*.json ./

# Instalamos las dependencias del proyecto.
# 'npm ci' es más rápido y seguro para builds de producción que 'npm install'.
RUN npm ci

# Copiamos el resto del código fuente de la aplicación.
COPY . .

# Ejecutamos el script de build de React para generar los archivos estáticos.
RUN npm run build

# ===== Etapa 2: Production (Producción) =====
# Usamos una imagen de Nginx súper ligera para servir nuestro contenido estático.
FROM nginx:stable-alpine

# Copiamos los archivos estáticos generados en la etapa 'builder'
# del directorio /app/build al directorio por defecto de Nginx para servir contenido web.
COPY --from=builder /app/build /usr/share/nginx/html

# Opcional: Copia una configuración personalizada de Nginx si la tienes.
# Por ejemplo, para manejar rutas de React Router.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80, que es el puerto por defecto de Nginx.
EXPOSE 80

# El comando por defecto de la imagen de Nginx ya se encarga de iniciar el servidor.
# Este comando asegura que Nginx se ejecute en primer plano.
CMD ["nginx", "-g", "daemon off;"]