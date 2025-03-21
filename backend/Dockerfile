# Hono + TypeScript バックエンド用 Dockerfile

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

# 開発サーバーのポートを公開（Honoのデフォルトポート）
EXPOSE 8787

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

# TypeScriptのビルドを実行
RUN npm run build

# 本番環境
FROM base AS production

WORKDIR /app

# パッケージ管理ファイルをコピー
COPY package.json package-lock.json* ./

# 本番用の依存関係のみをインストール
RUN npm ci --production || npm install --production

# ビルド済みのアプリケーションをコピー
COPY --from=build /build/dist ./dist

# 本番サーバーのポートを公開
EXPOSE 8787

# サーバー起動
CMD ["npm", "run", "start"]