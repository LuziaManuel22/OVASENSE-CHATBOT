import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getChatbotResponse } from "./services/llmservices.js";// Importando o serviço LLM

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OvaSense Chatbot Backend is running!");
});

// Nova Rota para o Chatbot
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await getChatbotResponse(message);
    res.json({ reply: response });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
