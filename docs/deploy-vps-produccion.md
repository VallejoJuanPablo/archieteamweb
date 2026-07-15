# Guia de Deploy a Produccion — ArchieTeam

> SPA estatica, un solo container Nginx detras de Traefik.
>
> Stack: Docker Compose | Traefik (reverse proxy + SSL) | Angular 19 + Tailwind CSS 4 | Nginx

---

## Indice

1. [Prerequisitos](#1-prerequisitos)
2. [Arquitectura](#2-arquitectura)
3. [Preparar el VPS (si es la primera vez)](#3-preparar-el-vps-si-es-la-primera-vez)
4. [Deploy de ArchieTeam](#4-deploy-de-archieteam)
5. [Verificacion post-deploy](#5-verificacion-post-deploy)
6. [Actualizaciones futuras](#6-actualizaciones-futuras)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Prerequisitos

### Que necesitas tener

| Requisito | Detalle |
|-----------|---------|
| VPS con Docker + Docker Compose | Ubuntu 22/24 LTS, minimo 1 vCPU, 1 GB RAM |
| Traefik corriendo | Reverse proxy global con SSL automatico |
| Red Docker `proxy` | Red compartida entre Traefik y los proyectos |
| Dominio apuntado al VPS | Registro A en DNS → IP del VPS |
| Acceso SSH al VPS | Usuario `deploy` con clave SSH |

> **Si el VPS ya tiene Traefik configurado** (por ejemplo, de otro proyecto como Braillin), saltar directo a la [seccion 4](#4-deploy-de-archieteam).
>
> **Si es un VPS limpio**, seguir primero la [seccion 3](#3-preparar-el-vps-si-es-la-primera-vez).

---

## 2. Arquitectura

ArchieTeam es una SPA pura (sin backend ni base de datos). La arquitectura es minima:

```
Internet
    |
    v
[ Traefik :80/:443 ]  ─── SSL automatico (Let's Encrypt)
    |
    |── archie.bowin.com.ar ──> [ archieteam-web ]  Nginx (Angular SPA)
    |
    |── (otros proyectos) ──> [ ... ]
    |
    v
[ Red Docker: proxy ]
```

### Componentes

| Componente | Funcion |
|------------|---------|
| **Traefik** | Recibe trafico, rutea por dominio, genera SSL |
| **archieteam-web** | Container Nginx que sirve el build estatico de Angular |
| **Red `proxy`** | Red compartida entre Traefik y el container |

No hay backend, no hay base de datos, no hay volumenes persistentes. Es el deploy mas simple posible.

---

## 3. Preparar el VPS (si es la primera vez)

> Si ya tenes Traefik corriendo en el VPS, **saltar esta seccion entera**.

### 3.1 Acceso inicial y seguridad

```bash
# Conectar al VPS
ssh root@IP_DEL_VPS

# Actualizar sistema
apt update && apt upgrade -y

# Crear usuario de deploy
adduser deploy
usermod -aG sudo deploy

# Copiar clave SSH
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### 3.2 Configurar SSH seguro

```bash
nano /etc/ssh/sshd_config
```

Cambiar:
```
Port 2222
PermitRootLogin no
PasswordAuthentication no
MaxAuthTries 3
AllowUsers deploy
```

```bash
systemctl restart sshd
```

> **Antes de cerrar la sesion**, verificar desde OTRA terminal:
> ```bash
> ssh -p 2222 deploy@IP_DEL_VPS
> ```

### 3.3 Instalar Docker

```bash
# Como usuario deploy
sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Agregar al grupo docker
sudo usermod -aG docker deploy
# Cerrar y reconectar para que tome efecto
```

### 3.4 Estructura de directorios

```bash
sudo mkdir -p /opt/docker
sudo chown deploy:deploy /opt/docker
mkdir -p /opt/docker/traefik
```

### 3.5 Configurar Traefik

```bash
# Crear red compartida
docker network create proxy

# Config de Traefik
nano /opt/docker/traefik/traefik.yml
```

```yaml
api:
  dashboard: false

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"
    http:
      tls:
        certResolver: letsencrypt

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: proxy

certificatesResolvers:
  letsencrypt:
    acme:
      email: TU_EMAIL@AQUI.COM
      storage: /acme.json
      httpChallenge:
        entryPoint: web

log:
  level: WARN
```

```bash
# Crear archivo de certificados
touch /opt/docker/traefik/acme.json
chmod 600 /opt/docker/traefik/acme.json

# Docker Compose de Traefik
nano /opt/docker/traefik/docker-compose.yml
```

```yaml
services:
  traefik:
    image: traefik:v3.4
    container_name: traefik
    restart: unless-stopped
    environment:
      - DOCKER_API_VERSION=1.45    # Ajustar segun: docker version --format '{{.Server.APIVersion}}'
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./acme.json:/acme.json
    networks:
      - proxy

networks:
  proxy:
    external: true
```

> **Importante:** Verificar la version de la API Docker del servidor con `docker version --format '{{.Server.APIVersion}}'` y poner ese valor en `DOCKER_API_VERSION`. Traefik v3.4 usa 1.24 por defecto y falla con Docker Engine moderno.

```bash
# Levantar Traefik
cd /opt/docker/traefik
docker compose up -d
docker compose logs -f   # Verificar que arranca sin errores (Ctrl+C para salir)
```

### 3.6 Configurar firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable
```

---

## 4. Deploy de ArchieTeam

### 4.1 Configurar DNS

Dominio: **`archie.bowin.com.ar`**

En el panel DNS de `bowin.com.ar`, agregar:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | `archie` | `IP_DEL_VPS` | 300 |

Verificar propagacion:
```bash
dig archie.bowin.com.ar +short
# Debe mostrar la IP del VPS
```

### 4.2 Crear la carpeta del proyecto en el servidor

```bash
ssh -p 2222 deploy@IP_DEL_VPS

mkdir -p /opt/docker/archieteam
cd /opt/docker/archieteam
```

### 4.3 Clonar el repositorio

```bash
# Si el repo es publico:
git clone https://github.com/TU_USUARIO/archieteam.git repo

# Si es privado:
ssh-keygen -t ed25519 -f ~/.ssh/archieteam_deploy -N ""
cat ~/.ssh/archieteam_deploy.pub
# Copiar la clave publica → GitHub → repo Settings → Deploy Keys → Add

# Configurar SSH para ese repo
nano ~/.ssh/config
```
```
Host github-archieteam
    HostName github.com
    User git
    IdentityFile ~/.ssh/archieteam_deploy
```
```bash
git clone git@github-archieteam:TU_USUARIO/archieteam.git repo
```

### 4.4 Copiar los archivos de deploy

Los archivos necesarios ya estan en el repo:

```
repo/
├── Dockerfile              ← Build multi-stage (Node → Nginx)
├── nginx.conf              ← Config de Nginx (SPA routing + cache + gzip)
├── docker-compose.prod.yml ← Compose de produccion (1 container + Traefik)
└── deploy.sh               ← Script de deploy automatizado
```

Crear un symlink o copiar el docker-compose a la carpeta del proyecto:

```bash
cd /opt/docker/archieteam
cp repo/docker-compose.prod.yml docker-compose.yml
```

Editar el `docker-compose.yml` para apuntar el build context al repo:

```bash
nano /opt/docker/archieteam/docker-compose.yml
```

Cambiar la seccion `build`:
```yaml
services:
  archieteam-web:
    build:
      context: ./repo
      dockerfile: Dockerfile
```

### 4.6 Levantar

```bash
cd /opt/docker/archieteam
docker compose up -d --build
```

Esto va a:
1. Instalar dependencias de Node.js
2. Ejecutar `ng build --configuration production`
3. Copiar el build a una imagen Nginx limpia
4. Levantar el container conectado a Traefik
5. Traefik auto-detecta el container y genera el certificado SSL

**Verificar:**

```bash
# Estado del container
docker compose ps

# Logs
docker compose logs -f archieteam-web

# Probar desde el servidor
curl -s http://localhost | head -5
```

### 4.7 Verificar desde el navegador

Abrir `https://archie.bowin.com.ar` — deberia cargar la pantalla "PRESS START" de ArchieTeam.

---

## 5. Verificacion post-deploy

### Checklist

```
[ ] https://archie.bowin.com.ar carga la home (PRESS START)
[ ] Navegar a /agents funciona
[ ] Navegar a /skills funciona
[ ] Navegar a /rules funciona
[ ] Navegar a /projects funciona
[ ] Navegar a /methodologies funciona
[ ] Refresh en /agents NO da 404 (SPA routing)
[ ] http://archie.bowin.com.ar redirige a https://
[ ] El certificado SSL es valido (candado verde)
[ ] Los estilos retro 8-bit se ven correctamente (scanlines, neon glow)
[ ] La fuente monospace carga
```

### Verificar SSL

```bash
curl -I https://archie.bowin.com.ar
# Debe responder 200 con headers de seguridad
```

---

## 6. Actualizaciones futuras

### Deploy manual (3 comandos)

```bash
ssh -p 2222 deploy@IP_DEL_VPS

cd /opt/docker/archieteam/repo
git pull origin master
cd ..
docker compose up -d --build
```

### Deploy con script

```bash
ssh -p 2222 deploy@IP_DEL_VPS
cd /opt/docker/archieteam
./repo/deploy.sh
```

### Que pasa internamente

1. `git pull` trae los cambios
2. Docker re-ejecuta el build multi-stage (Node instala deps → Angular compila → Nginx sirve)
3. El container viejo se reemplaza por el nuevo (zero downtime gracias a Traefik)
4. Las imagenes viejas quedan como cache (limpiar periodicamente con `docker image prune -a`)

### Tiempo estimado de rebuild

| Paso | Primera vez | Con cache |
|------|------------|-----------|
| npm install | ~30s | ~5s (si no cambio package.json) |
| ng build | ~20-40s | ~20-40s (siempre rebuilds) |
| Copy to Nginx | <1s | <1s |
| **Total** | **~60-90s** | **~30-50s** |

---

## 7. Troubleshooting

### El sitio no carga / ERR_CONNECTION_REFUSED

```bash
# 1. Verificar que Traefik esta corriendo
docker ps | grep traefik
docker logs traefik --tail 30

# 2. Verificar que el container esta corriendo
cd /opt/docker/archieteam
docker compose ps
docker compose logs archieteam-web --tail 30

# 3. Verificar DNS
dig archie.bowin.com.ar +short
# Debe mostrar la IP del VPS
```

### 502 Bad Gateway

```bash
# Traefik no puede conectar al container
# Verificar que el container esta en la red proxy:
docker network inspect proxy | grep archieteam

# Si no esta, recrear:
docker compose down
docker compose up -d
```

### SSL no se genera

```bash
# Verificar logs de Traefik
docker logs traefik 2>&1 | grep -i "acme\|certificate\|error"

# Causas comunes:
# 1. DNS no apunta al VPS
# 2. Puerto 80 cerrado (verificar: sudo ufw status)
# 3. acme.json sin permisos (chmod 600)
```

### Refresh en una ruta da 404

```bash
# Verificar que nginx.conf se copio bien
docker compose exec archieteam-web cat /etc/nginx/conf.d/default.conf | grep try_files
# Debe contener: try_files $uri $uri/ /index.html;

# Si no esta, rebuild:
docker compose up -d --build
```

### Build falla por falta de RAM

```bash
# Crear swap temporal en el servidor
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Reintentar build
docker compose up -d --build

# Alternativa: buildear en tu maquina local
# En tu maquina:
cd C:/xampp/htdocs/Personal/ArchieTeam
docker build -t archieteam-web:latest .
docker save archieteam-web:latest | gzip > archieteam-web.tar.gz
scp -P 2222 archieteam-web.tar.gz deploy@IP_DEL_VPS:/tmp/

# En el servidor:
docker load < /tmp/archieteam-web.tar.gz
# Editar docker-compose.yml: cambiar "build:" por "image: archieteam-web:latest"
docker compose up -d
```

### Traefik no arranca (Docker API version)

```bash
# Verificar version de la API Docker
docker version --format '{{.Server.APIVersion}}'

# Poner ese valor en el docker-compose de Traefik:
# environment:
#   - DOCKER_API_VERSION=X.XX
```

---

## Resumen del flujo

```
 PRIMERA VEZ (si el VPS es nuevo)
 ─────────────────────────────────
 1. Configurar SSH + usuario deploy
 2. Instalar Docker
 3. Crear red "proxy" + levantar Traefik
 4. Configurar firewall (UFW)

 DEPLOY DE ARCHIETEAM
 ─────────────────────────────────
 5. Crear carpeta /opt/docker/archieteam
 6. Clonar repositorio
 7. Copiar docker-compose.prod.yml como docker-compose.yml
 8. Apuntar DNS: archie.bowin.com.ar → IP del VPS
 10. docker compose up -d --build
 11. Verificar checklist

 UPDATES FUTUROS
 ─────────────────────────────────
 12. git pull + docker compose up -d --build
```

### Archivos de deploy en el repo

| Archivo | Funcion |
|---------|---------|
| `Dockerfile` | Build multi-stage: Node 22 compila Angular → Nginx 1.27 sirve |
| `nginx.conf` | SPA routing + gzip + cache agresivo + headers de seguridad |
| `docker-compose.prod.yml` | 1 servicio (Nginx) conectado a Traefik via red `proxy` |
| `deploy.sh` | Script: git pull → build → verificar |
