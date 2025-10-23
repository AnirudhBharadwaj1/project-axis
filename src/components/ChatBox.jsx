import { useState, useEffect } from "react";
import "../styles/Chat.css";
import { FaSchool, FaTimes } from "react-icons/fa";

function ChatBox() {
    const [open, isOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `http://localhost:5000/getUser?uid=${localStorage.getItem(
                        "uid"
                    )}`
                );

                const data = await res.json();

                setMessages(data.msgHistory);
            } catch (error) {
                console.error("Error fetching user on frontend side:", error);
            }
        };

        fetchUser();
        setLoading(false);
    }, []);

    return (
        <>
            {open ? <div className="chat-box"></div> : []}
            <div className="chat-button">
                {open ? (
                    <FaSchool size={24}></FaSchool>
                ) : (
                    <FaTimes size={24}></FaTimes>
                )}
            </div>
        </>
    );
}

export default ChatBox;
