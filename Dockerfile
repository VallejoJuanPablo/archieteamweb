# === Stage 1: Build de Angular ===
FROM node:22-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar codigo fuente
COPY . .

# Build de produccion
RUN npx ng build --configuration production

# === Stage 2: Servir con Nginx ===
FROM nginx:1.27-alpine

# Copiar el build de Angular al directorio de Nginx
COPY --from=build /app/dist/archie-team/browser /usr/share/nginx/html

# Copiar config custom de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
