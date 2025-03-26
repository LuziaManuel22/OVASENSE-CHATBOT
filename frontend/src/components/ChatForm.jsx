import { useState } from "react";
import axios from "axios";

const ChatForm = ({ chatHistory, setChatHistory }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { role: "user", text: inputText };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", { message: inputText });
      const botMessage = { role: "bot", text: res.data.response };
      setChatHistory([...chatHistory, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Message..." />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatForm;
