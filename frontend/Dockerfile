# Remix + TypeScript フロントエンド用 Dockerfile

# Node.js 22系 LTS + Debian 12 (bookworm)
FROM node:22-bookworm AS base

# 開発環境
FROM base AS development

WORKDIR /app

# パッケージ管理ファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm ci || npm install

# アプリケーションソースをコピー
COPY . .

# 開発サーバーのポートを公開
EXPOSE 3000

# 開発サーバー起動コマンド（compose.ymlで上書き可能）
CMD ["npm", "run", "dev"]

# ビルド環境
FROM base AS build

WORKDIR /build

# パッケージ管理ファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm ci || npm install

# アプリケーションソースをコピー
COPY . .

# 本番用ビルドを実行
RUN npm run build

# 本番環境
FROM base AS production

WORKDIR /app

# 本番用の依存関係のみをインストール
COPY package.json package-lock.json* ./
RUN npm ci --production || npm install --production

# ビルド済みのアプリケーションをコピー
COPY --from=build /build/build ./build
COPY --from=build /build/public ./public

# 本番サーバーのポートを公開
EXPOSE 3000

# サーバー起動
CMD ["npm", "run", "start"]