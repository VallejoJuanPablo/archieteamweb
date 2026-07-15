#!/bin/bash
set -e

# === CONFIGURACION ===
IMAGE_NAME="archieteam-web"
IMAGE_FILE="archieteam-web.tar.gz"
SERVER_USER="deploy"
SERVER_HOST=""          # <-- IP del VPS
SERVER_PORT="2222"
SERVER_PATH="/opt/docker/archieteam"

# === VALIDAR ===
if [ -z "$SERVER_HOST" ]; then
  echo "ERROR: Configurar SERVER_HOST con la IP del VPS en este script."
  exit 1
fi

echo "=== Deploy local de ArchieTeam ==="
echo ""

# === 1. BUILD LOCAL (linux/amd64) ===
echo ">>> [1/4] Buildeando imagen para linux/amd64..."
docker build --platform linux/amd64 -t ${IMAGE_NAME}:latest .
echo "    Build OK"

# === 2. EXPORTAR IMAGEN ===
echo ">>> [2/4] Exportando imagen a ${IMAGE_FILE}..."
docker save ${IMAGE_NAME}:latest | gzip > ${IMAGE_FILE}
SIZE=$(du -h ${IMAGE_FILE} | cut -f1)
echo "    Imagen exportada (${SIZE})"

# === 3. SUBIR AL SERVIDOR ===
echo ">>> [3/4] Subiendo al servidor..."
scp -P ${SERVER_PORT} ${IMAGE_FILE} ${SERVER_USER}@${SERVER_HOST}:/tmp/${IMAGE_FILE}
echo "    Upload OK"

# === 4. CARGAR Y LEVANTAR EN EL SERVIDOR ===
echo ">>> [4/4] Cargando imagen y reiniciando container..."
ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} << EOF
  set -e
  echo "    Cargando imagen..."
  docker load < /tmp/${IMAGE_FILE}
  rm /tmp/${IMAGE_FILE}

  echo "    Levantando container..."
  cd ${SERVER_PATH}/repo
  docker compose -f docker-compose.server.yml up -d

  echo "    Estado:"
  docker compose -f docker-compose.server.yml ps
EOF

# === LIMPIAR LOCAL ===
rm -f ${IMAGE_FILE}

echo ""
echo "=== Deploy completo ==="
echo "    https://archie.bowin.com.ar"
