import express from "express";
import { getChatbotResponse } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await getChatbotResponse(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error generating response" });
  }
});

export default router;
