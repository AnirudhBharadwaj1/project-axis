import "../styles/Chat.css";

function ChatMessage({ message }) {
    return (
        <div className="chat-message">
            <p className="chat-text">{message.text}</p>
        </div>
    );
}

export default ChatMessage;
