import request from "supertest";
import express from "express";
import * as crypto from "crypto";
import apiRouter from "../src/routes/devices"; // apiRoutes をインポート（適宜パスを変更）

const app = express();

// JSON リクエストボディを解析するミドルウェア
app.use(express.json());
app.use(apiRouter); // 作成したルーターを追加

describe("POST /api/devices", () => {
  it("should return 400 if required parameters are missing", async () => {
    const response = await request(app).post("/api/devices").send({}); // トークンとシークレットを送らない

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required parameters");
  });

  it("should return 401 if invalid token and secret are provided", async () => {
    // 例として、無効な token と secret を送信
    const response = await request(app).post("/api/devices").send({
      token: "invalidToken",
      secret: "invalidSecret",
    });

    expect(response.status).toBe(401);
  });
});
