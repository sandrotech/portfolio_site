# ===========================
# Etapa 1: Build da aplicação
# ===========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ===========================
# Etapa 2: Executar o servidor de produção
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

# 💡 Usa shell form para interpolar ${PORT}
CMD sh -c "npx next start -p ${PORT}"
