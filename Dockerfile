# ---------- Build stage ----------
FROM node:20-alpine AS build
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
# If you use Vite and output folder is "dist", keep BUILD_DIR=dist
ARG BUILD_DIR=dist
ENV BUILD_DIR=${BUILD_DIR}
RUN pnpm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine AS runtime
# SPA-friendly nginx config with caching & history fallback
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;
  # Static files location
  root /usr/share/nginx/html;

  # Gzip
  gzip on;
  gzip_types text/plain text/css application/json application/javascript application/xml+rss image/svg+xml;
  gzip_min_length 1024;

  # Cache headers for assets
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
    try_files $uri =404;
  }

  # Healthcheck
  location = /health {
    return 200 "ok";
    add_header Content-Type text/plain;
  }

  # SPA fallback
  location / {
    try_files $uri /index.html;
  }
}
NGINX

# Copy build artifacts
ARG BUILD_DIR=build
COPY --from=build /app/${BUILD_DIR} /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
