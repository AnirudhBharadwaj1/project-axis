import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentAlt, FaTimes, FaPaperPlane } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import ChatMessage from "../components/ChatMessage";
import "../styles/Chat.css";
import logo from "../assets/logo_light.png";

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState("");
  const [sendMessage, setSendMessage] = useState(true);
  const [bottomOffset, setBottomOffset] = useState(2);
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    // Make sure there is content in the message
    e.preventDefault();
    const userText = msgText.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setMsgText("");
    setSendMessage(false);

    // Get response from endpoint
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages,
        }),
      });

      const data = await res.json();

      if (data.message.startsWith("add-to-cart:")) {
        const productId = data.message.replace("add-to-cart:", "");
        addToCart(productId);
        setMessages((prev) => [
          ...prev,
          { text: "Added product to cart.", sender: "bot" },
        ]);
        return;
      } else if (data.message.startsWith("redirect:")) {
        const productId = data.message.replace("redirect:", "");
        navigate(`/product/${productId}`);
        return; // <-- TODO: Is this necessary?
      }

      setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
      // Possible responses from AI with the keywords
      // if (data.action === "redirect") {
      //   const page = data.target;
      //   navigate(`/product/${page}`);
      // } else if (data.action === "cart") {
      //   // console.log("Add to cart");

      //   let text;

      //   if (!cart.includes(data.target)) {
      //     addToCart(data.target);
      //     text = "The item has been added to your cart.";
      //   } else {
      //     text = "The item is already in your cart.";
      //   }

      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       text: text,
      //       sender: "bot",
      //     },
      //   ]);
      // } else if (data.action === "respond") {
      //   setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
      // }
    } catch (error) {
      console.error("Error with chatbot:", error);
    }

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
