import * as crypto from "crypto";
import * as https from "https";
import { Router, Request, Response } from "express";

const router = Router();

// GET /v1.1/devicesの実装
router.post("/api/devices", (req: Request, res: Response): void => {
  const { token, secret } = req.body;

  // 必須パラメータがない場合はエラーを返す
  if (!token || !secret) {
    res.status(400).json({ message: "Missing required parameters" });
    return;
  }

  // HMAC署名を生成
  const t: number = Date.now();
  const nonce: string = "requestID"; // 一意なリクエストIDを使う場合は変更が必要
  const data: string = token + t + nonce;
  const sign: string = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  // HTTPS リクエストオプション
  const options: https.RequestOptions = {
    hostname: "api.switch-bot.com",
    port: 443,
    path: `/v1.1/devices`,
    method: "GET",
    headers: {
      Authorization: token,
      sign: sign,
      nonce: nonce,
      t: t.toString(),
      "Content-Type": "application/json",
    },
  };

  // SwitchBot API にリクエストを送信
  const reqSwitchBot = https.request(options, async (response: any) => {
    let data = "";

    response.on("data", (chunk: string) => {
      data += chunk;
    });

    response.on("end", () => {
      res.status(response.statusCode || 500).send(data);
    });
  });

  reqSwitchBot.on("error", (error) => {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  });

  reqSwitchBot.end();
});

export default router;
