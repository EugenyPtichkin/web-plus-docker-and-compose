FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . ./
RUN npm run build \
  && rm -rf ./src/ \
  && rm -rf node ./node_modules/

FROM node:16-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund \
  && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./
EXPOSE 4000
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js" ]