import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaPaperPlane,
  FaUser,
  FaHistory,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : "."));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "I'm here to help! 😊", sender: "bot" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Overlay */}
      <div style={styles.backgroundOverlay}></div>

      <div style={styles.container}>
        {/* Profile Section */}
        <div
          style={styles.profileSection}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={styles.username}>John Doe</span>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            style={styles.profileImage}
          />

          {/* Dropdown Menu */}
          {menuOpen && (
            <div style={styles.dropdownMenu}>
              <div style={styles.menuItem}>
                <FaUser style={styles.icon} /> Profile
              </div>
              <div style={styles.menuItem}>
                <FaHistory style={styles.icon} /> Chat History
              </div>
              <div style={styles.menuItem}>
                <FaPhone style={styles.icon} /> Contact Us
              </div>
              <div style={styles.menuItem}>
                <FaSignOutAlt style={styles.icon} /> Log Out
              </div>
            </div>
          )}
        </div>

        {/* Chat Box */}
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={msg.sender === "user" ? styles.userMsg : styles.botMsg}
            >
              {msg.text}
            </div>
          ))}

          {/* Bot Typing Indicator */}
          {isTyping && <div style={styles.typingIndicator}>Typing{dots}</div>}
        </div>

        {/* Input Area with Send Arrow */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <FaPaperPlane
            onClick={handleSendMessage}
            style={styles.sendIcon}
            className="hover-effect"
          />{" "}
          {/* Send Arrow */}
        </div>

        {/* Microphone Icon */}
        <div style={styles.micContainer}>
          <FaMicrophone style={styles.micIcon} className="hover-effect" />
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundImage: "url('/deloitte_logo.png')", // Deloitte Branding
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },

  container: {
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    zIndex: 2,
  },

  profileSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    borderBottom: "2px solid #86BC25",
    cursor: "pointer",
    position: "relative",
  },

  username: { marginRight: "10px", fontWeight: "bold", color: "#333" },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #86BC25",
  },

  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "10px",
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "180px",
    zIndex: 1000,
    border: "1px solid #ccc",
  },
  menuItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  icon: { marginRight: "10px", color: "#86BC25", transition: "0.3s" },

  chatBox: {
    height: "300px",
    overflowY: "auto",
    padding: "10px",
    position: "relative",
    backgroundColor: "#fff",
  },
  userMsg: {
    textAlign: "right",
    background: "#daf8cb",
    padding: "8px",
    borderRadius: "8px",
    margin: "5px",
    color: "#333",
  },
  botMsg: {
    textAlign: "left",
    background: "#E3F2C1",
    padding: "8px",
    borderRadius: "8px",
    margin: "5px",
    color: "#333",
  },

  typingIndicator: {
    textAlign: "left",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#86BC25",
    animation: "blink 1s infinite alternate",
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "30px",
    padding: "5px 10px",
    marginTop: "10px",
    backgroundColor: "#fff",
    width: "calc(100% - 50px)",
    position: "relative",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  sendIcon: {
    fontSize: "20px",
    color: "#86BC25",
    cursor: "pointer",
    transition: "0.3s",
  },
  micContainer: { position: "absolute", bottom: "15px", right: "10px" },
  micIcon: {
    fontSize: "24px",
    color: "#86BC25",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Chatbot;

