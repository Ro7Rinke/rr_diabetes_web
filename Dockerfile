# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci --legacy-peer-deps

# Copia todo o código
COPY . .

# Build da aplicação
RUN npm run build -- --no-lint

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia arquivos essenciais do builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/next.config.js ./next.config.js

EXPOSE 7002

# Comando padrão para rodar Next.js em produção
CMD ["npm", "run", "start"]