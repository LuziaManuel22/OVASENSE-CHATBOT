import { useState } from "react";
import "./styles.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me about PCOS.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
  
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
  
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
      const botReply = { text: data.reply || "I didn't understand that.", sender: "bot" };
      setMessages([...messages, userMessage, botReply]);
    } catch (error) {
      console.error("Chat error:", error);
      const botReply = { text: "Server error. Try again later.", sender: "bot" };
      setMessages([...messages, userMessage, botReply]);
    }
  };
  
  return (
    <div className="chat-container">
      <div className="chat-header">OvaSense Chatbot</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

