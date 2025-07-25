# Etapa 1: Compilar la aplicación de React
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias para la compilación
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con un servidor Node.js ligero
FROM node:20-alpine AS production

WORKDIR /app

# Copiar solo el package.json y package-lock.json para instalar solo las dependencias de producción
COPY package*.json ./

# Instalar solo las dependencias de producción (como 'serve')
# Esto crea una imagen más pequeña que si copiáramos node_modules de la etapa anterior
RUN npm install --only=production

# Copiar los archivos de compilación de la etapa 'builder'
COPY --from=builder /app/build ./build

# Exponer el puerto 8080. 'serve' escuchará en el puerto definido por la variable de entorno PORT,
# que Cloud Run proporciona automáticamente. Por defecto, 'serve' usa el puerto 3000.
EXPOSE 8080

# Comando para iniciar el servidor. Cloud Run establece la variable PORT,
# y el paquete 'serve' la utilizará automáticamente.
CMD [ "npm", "start" ]