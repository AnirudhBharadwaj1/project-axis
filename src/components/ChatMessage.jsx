import "../styles/Chat.css";

function ChatMessage({ message }) {
    return (
        <div
            className="chat-message"
            style={{
                justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
            }}
        >
            <p className="chat-text">{message.text}</p>
        </div>
    );
}

export default ChatMessage;
