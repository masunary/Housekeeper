import express, { Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes"; // 定義したAPIルートをインポート
import deviceRoutes from "./routes/devices";

const app = express();
const port = 3000;

// ミドルウェア：JSONリクエストを解析
app.use(express.json());

// APIルーティングを追加
app.use(apiRoutes);
app.use(deviceRoutes);

// エラーハンドリング用ミドルウェア（最後に追加する）
app.use((err: any, req: Request, res: Response, next: Function) => {
  // エラーハンドリング
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
