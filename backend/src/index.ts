import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const app = new Hono();

// CORSミドルウェアを追加
app.use(
    "/*",
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// ヘルスチェック用のエンドポイント
app.get("/", (c) => {
    return c.json({
        status: "ok",
        message: "Café Zen API is running",
    });
});

// APIエンドポイント
app.get("/api/menus", (c) => {
    return c.json({
        items: [
            { id: 1, name: "ブレンドコーヒー", price: 450, category: "drink" },
            { id: 2, name: "カフェラテ", price: 500, category: "drink" },
            { id: 3, name: "カプチーノ", price: 500, category: "drink" },
            { id: 4, name: "モカ", price: 550, category: "drink" },
            { id: 5, name: "エスプレッソ", price: 400, category: "drink" },
            { id: 6, name: "チーズケーキ", price: 550, category: "food" },
            { id: 7, name: "クロワッサン", price: 300, category: "food" },
            { id: 8, name: "パンケーキ", price: 650, category: "food" },
        ],
    });
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});