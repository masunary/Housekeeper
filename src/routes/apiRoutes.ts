import { Router, Request, Response } from "express";

const router = Router();

// サンプルのGETエンドポイント
router.get("/", (req: Request, res: Response): void => {
  res.send("Hello, World!");
});

// サンプルのPOSTエンドポイント
router.post("/api/data", (req: Request, res: Response): void => {
  const { name } = req.body;

  // nameが存在しない場合は400エラーを返す
  if (!name) {
    res.status(400).json({ message: "Name is required" });
  }

  res.json({ message: `Hello, ${name}` });
});

export default router;
