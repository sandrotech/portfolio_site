# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Instala o pnpm (caso o projeto use)
RUN npm install -g pnpm

# Instala dependências
RUN pnpm install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o build de produção do Next.js
RUN pnpm run build

# Etapa 2: Executar o servidor de produção
FROM node:20-alpine AS runner

WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Define variável de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Expõe a porta dinamicamente (pode ser substituída em tempo de execução)
EXPOSE ${PORT}

# Comando de inicialização
CMD ["sh", "-c", "next start -p ${PORT}"]
