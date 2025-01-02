import request from "supertest";
import express from "express";
import apiRoutes from "../src/routes/apiRoutes"; // 先ほど定義したAPIルートをインポート

// Expressアプリケーションの設定
const app = express();
app.use(express.json());
app.use(apiRoutes);

describe("API Endpoints", () => {
  // GET /のテスト
  it('should respond with "Hello, World!" on GET /', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });

  // POST /api/dataのテスト
  it("should respond with a greeting message on POST /api/data", async () => {
    const requestBody = { name: "Taro" };
    const response = await request(app).post("/api/data").send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello, Taro");
  });

  // POST /api/dataのエラーテスト（nameが欠けている場合）
  it("should return a 400 error if name is missing in POST /api/data", async () => {
    const requestBody = {}; // nameフィールドが無い場合
    const response = await request(app).post("/api/data").send(requestBody);
    expect(response.status).toBe(400); // Bad Request
    expect(response.body.message).toBe("Name is required");
  });
});
