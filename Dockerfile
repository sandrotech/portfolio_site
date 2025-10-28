# ===========================
# Etapa 1: Build da aplicação
# ===========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências (forçando instalação mesmo com conflitos)
RUN npm install --legacy-peer-deps

# Copia o restante do projeto
COPY . .

# Gera o build de produção
RUN npm run build

# ===========================
# Etapa 2: Executar o servidor de produção
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copia os arquivos essenciais do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Define variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Expõe a porta dinamicamente para o CapRover detectar
EXPOSE ${PORT}

# Inicia o servidor Next.js (via npx)
CMD ["npx", "next", "start", "-p", "${PORT}"]
