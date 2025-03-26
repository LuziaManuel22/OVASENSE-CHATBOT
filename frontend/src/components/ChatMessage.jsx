const ChatMessage = ({ chat }) => {
    return (
      <div className={`message ${chat.role === "user" ? "user-message" : "bot-message"}`}>
        <p className="message-text">{chat.text}</p>
      </div>
    );
  };
  
  export default ChatMessage;
  