import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Histórico da conversa para manter contexto
let chatHistory = [];

export async function getChatbotResponse(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Adiciona a nova pergunta ao histórico
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    // Criar um prompt que orienta a IA a responder de forma natural
    const prompt = `
      You are OvaSense, an AI chatbot designed to provide helpful, conversational, and engaging responses about PCOS (Polycystic Ovary Syndrome).
      - You should act like a knowledgeable but friendly assistant.
      - If the user asks something about PCOS, answer naturally, keeping the conversation flowing.
      - If the user asks a follow-up question like "Can you explain more?" or "What do you mean?", assume they are still referring to PCOS.
      - If the user greets you (e.g., "Hello", "Hi"), respond naturally and encourage them to ask about PCOS.
      - If the user expresses gratitude (e.g., "Thank you"), acknowledge it naturally.
      - If the user asks about something completely unrelated to PCOS, politely redirect them with: "I specialize in PCOS-related topics. Let’s talk about that!"

      Conversation History:
      ${chatHistory.map(msg => `${msg.role === "user" ? "User" : "OvaSense"}: ${msg.parts[0].text}`).join("\n")}

      User: ${userMessage}
      OvaSense:
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;

    // Adiciona a resposta ao histórico para manter a conversa fluida
    chatHistory.push({ role: "model", parts: [{ text: response }] });

    return response.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble responding right now. Please try again later.";
  }
}

