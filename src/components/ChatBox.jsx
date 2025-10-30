import { useState, useEffect } from "react";
import { FaCommentAlt, FaTimes, FaPaperPlane } from "react-icons/fa";
import ChatMessage from "../components/ChatMessage";
import "../styles/Chat.css";
import logo from "../assets/logo_light.png";

function ChatBox() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState("");
    const [sendMessage, setSendMessage] = useState(true);
    const [bottomOffset, setBottomOffset] = useState(2);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector("footer");
            if (!footer) return;

            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If footer is visible, lift chat above it
            if (footerTop < windowHeight) {
                const overlap = windowHeight - footerTop;
                setBottomOffset(2 + overlap / 16 + 1); // 16px extra padding
            } else {
                setBottomOffset(2); // default 2rem
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        handleScroll(); // initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Handle opening or closing the chat
    const handleChatButton = () => {
        setOpen(!open);

        // TODO: Add an animation here
    };

    // Handle submitting the message
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!msgText.trim()) return;

        setMessages((prev) => [
            ...prev,
            { text: msgText.trim(), sender: "user" },
        ]);
        setMsgText("");
        setSendMessage(false);

        console.log(messages);

        // TODO: Get response

        setSendMessage(true);
    };

    return (
        <div className="chat-bot" style={{ bottom: `${bottomOffset}rem` }}>
            {open && (
                <div className="chat-box">
                    <div className="chat-header">
                        <img src={logo} alt="Logo" className="chat-logo" />
                        <h3 className="chat-title">AXIS CHATBOT</h3>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <ChatMessage key={index} message={message} />
                        ))}
                    </div>
                    <form className="chat-area" onSubmit={handleSubmit}>
                        <textarea
                            className="chat-area-input scrollbar"
                            placeholder="Ask a question..."
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            rows={2}
                            onKeyDown={(e) => {
                                if (e.key == "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        ></textarea>
                        <button
                            className="chat-area-button"
                            type="submit"
                            disabled={!sendMessage}
                        >
                            <FaPaperPlane size={20} />
                        </button>
                    </form>
                </div>
            )}
            <button className="chat-button" onClick={handleChatButton}>
                {!open ? (
                    <FaCommentAlt size={20}></FaCommentAlt>
                ) : (
                    <FaTimes size={24}></FaTimes>
                )}
            </button>
        </div>
    );
}

export default ChatBox;
