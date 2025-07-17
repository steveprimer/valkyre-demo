import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsChatText } from "react-icons/bs";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
const [videoLoaded, setVideoLoaded] = useState(false);
const [showPopup, setShowPopup] = useState(false);

  const storeInfo = `
Store: Valkyre Clothing (https://valkyreclothing.in)

Tone: Bold, Gen-Z friendly, edgy, confident. No emojis.

Shipping: Pan India delivery in 5–7 working days. ₹70–₹100 shipping. Free shipping above ₹999.

Returns: Accepted within 7 days of delivery. Exchange allowed once. Item must be unused and undamaged.

Cancellations: Only before the item is dispatched.

Damaged/Defective: Must be reported within 24 hours of delivery.

Products: Oversized tees, streetwear, cargos, hoodies — made in India.

Out-of-scope queries: Reply with "Let me check with the Valkyre team and get back to you."
`;

useEffect(() => {
  const timer = setTimeout(() => setShowPopup(true), 8000);
  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
  if (loadingProgress < 100) {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        return next >= 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }
}, [loadingProgress]);

const handleVideoLoaded = () => {
  setLoadingProgress(100);
  setTimeout(() => {
    setVideoLoaded(true);
  }, 500); // brief delay for smooth transition
};

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
  if (isOpen && chat.length === 0) {
    setIsTyping(true);
    const welcomeText = "Hey!  I’m Valkyre’s AI assistant. Ask me anything about sizes, drops, shipping, or how to style your fit.";


    setTimeout(() => {
      const botMessage = { sender: "Bot", text: welcomeText };
      setChat([botMessage]);
      setMessages([{ role: "assistant", content: welcomeText }]);
      setIsTyping(false);
    }, 1200); // 1.2s delay
  }
}, [isOpen]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    const newMessages = [...messages, { role: "user", content: input }];

    setChat([...chat, userMessage]);
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        messages: newMessages,
        storeInfo,
      });

      const botText = res.data.reply;
      const botMessage = { sender: "Bot", text: botText };
      setChat(prev => [...prev, botMessage]);
      setMessages(prev => [...prev, { role: "assistant", content: botText }]);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: "Bot", text: "That was unexpected." };
      setChat(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const dotStyle = {
  width: "6px",
  height: "6px",
  backgroundColor: "#555",
  borderRadius: "50%",
  display: "inline-block",
  animation: "blink 1.2s infinite ease-in-out",
};

return (
  <>
    {!videoLoaded && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0a0014",
          color: "#f700ffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99999,
          transition: "opacity 0.5s ease",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Loading</h2>
        <div
          style={{
            width: "80%",
            height: "10px",
            background: "#222",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${loadingProgress}%`,
              height: "100%",
              background: "linear-gradient(to right, #a61919ff, #6113b4ff)",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{loadingProgress}%</p>
      </div>
    )}

    <style>
      {`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}
    </style>

    {/* Hero Section with Neon Background */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoaded}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
        src="/compressvideo.mp4"
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: -1,
        }}
      />

      {/* Hero Content */}
      <div
  style={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#a50000ff",
    padding: "0 1rem",
    zIndex: 1,
  }}
>
  <h1
    style={{
      fontSize: "3rem",
      fontWeight: 300,
      color: "#ffffff",
      marginBottom: "1rem",
      fontFamily: "'Montserrat', sans-serif",
    }}
  >
    VALKYRE AI SUPPORT
  </h1>
  <p
    style={{
      fontSize: "1.25rem",
      color: "#ffffffcc",
      maxWidth: "600px",
      fontFamily: "'Urbanist', sans-serif",
    }}
  >
    Instant help with orders, returns, sizing, and more — 24/7.
  </p>
  <p
    style={{
      fontSize: "1.25rem",
      fontWeight: 500,
      marginTop: "1rem",
      color: "#ffffffff",
      fontFamily: "'Montserrat', sans-serif",
    }}
  >
    Trained exclusively for <strong>VALKYRE CLOTHING</strong>
  </p>
</div>

    </div>

    {showPopup && (
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "100px",
          backgroundColor: "#0f172a",
          color: "white",
          border: "1px solid #efe9e9ff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          padding: "12px 16px",
          zIndex: 9999,
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <p style={{ fontSize: "14px", margin: 0 }}>
          💬 Chat with our AI assistant for instant help!
        </p>
        <button
          onClick={() => {
            setShowPopup(false);
            setIsOpen(true);
          }}
          style={{
            marginTop: "8px",
            color: "#fd1616ff",
            background: "none",
            border: "none",
            fontSize: "13px",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Open Chat
        </button>
      </div>
    )}



      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#000000",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "0.3s ease",
        }}
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        <div
          style={{
            position: "relative",
            width: "28px",
            height: "28px",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C4008F",
              fontSize: "28px",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              transform: isOpen ? "scale(1)" : "scale(0.8)",
            }}
          >
            ✖
          </span>

          <BsChatText
  size={28}
  color="#C4008F" // Valkyre purple-pink
  style={{
    position: "absolute",
    inset: 0,
    stroke: "#C4008F",
    strokeWidth: 1,
    opacity: isOpen ? 0 : 1,
    transition: "opacity 0.3s ease, transform 0.3s ease",
    transform: isOpen ? "scale(0.5)" : "scale(1)",
    filter: "drop-shadow(0 0 4px #C4008F)", // neon glow
  }}
/>

        </div>
      </div>

      {/* Chat Window Wrapper (always rendered) */}
{/* Chat Window Wrapper (always rendered) */}
<div
  style={{
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: isOpen ? "500px" : "0px",
    background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)", // dark gradient
    color: "#f2f2f2",
    border: "1.5px solid #C4008F", // Valkyre pink/purple
    borderRadius: "12px",
    padding: isOpen ? "1rem" : "0 1rem",
    zIndex: 9998,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 12px rgba(196, 0, 143, 0.5)", // neon glow
    overflow: "hidden",
    maxHeight: isOpen ? "500px" : "0px",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0px)" : "translateY(20px)",
    pointerEvents: isOpen ? "auto" : "none",
    transition:
      "max-height 0.4s ease, opacity 0.3s ease, transform 0.3s ease, padding 0.3s ease",
  }}
>
   <div
    style={{
      fontWeight: "700",
      fontSize: "16px",
      marginBottom: "0.8rem",
      color: "#fff",
      backgroundColor: "#C4008F", // Valkyre magenta
      textAlign: "center",
      borderRadius: "8px",
      padding: "0.5rem 0",
      boxShadow: "0 0 8px #C4008F",
      letterSpacing: "0.5px",
    }}
  >
    Valkyre AI Support
  </div>

  <div
    style={{
      flex: 1,
      overflowY: "auto",
      marginBottom: "0.5rem",
      border: "1px solid #4b0040",
      padding: "0.5rem",
      borderRadius: "6px",
      height: "100%",
      backgroundColor: "#1a1a1a",
    }}
  >
    {chat.map((msg, i) => (
      <p key={i} style={{ margin: "0.4rem 0" }}>
        <strong style={{ color: msg.sender === "You" ? "#C4008F" : "#FFFAFA" }}>
          {msg.sender}:
        </strong>{" "}
        {msg.text}
      </p>
    ))}
    <div ref={chatEndRef} />
    {isTyping && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
          paddingLeft: "2px",
        }}
      >
        <strong style={{ color: "#FFFAFA" }}>Bot:</strong>
        <div style={{ display: "flex", gap: "3px" }}>
          <span
            style={{ ...dotStyle, backgroundColor: "#C4008F" }}
          ></span>
          <span
            style={{
              ...dotStyle,
              backgroundColor: "#C4008F",
              animationDelay: "0.2s",
            }}
          ></span>
          <span
            style={{
              ...dotStyle,
              backgroundColor: "#C4008F",
              animationDelay: "0.4s",
            }}
          ></span>
        </div>
      </div>
    )}
  </div>

  <div style={{ display: "flex" }}>
  <input
    type="text"
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === "Enter" && handleSend()}
    style={{
      flex: 1,
      padding: "0.4rem 0.5rem",
      borderRadius: "6px",
      border: "1px solid #C4008F",
      fontSize: "14px",
      outlineColor: "#C4008F",
    }}
    placeholder="Type your question..."
  />
  <button
    onClick={handleSend}
    style={{
      marginLeft: "0.5rem",
      padding: "0.4rem 0.7rem",
      backgroundColor: "#C4008F",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    }}
    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#8f1010ff")}
    onMouseOut={e => (e.currentTarget.style.backgroundColor = "#C4008F")}
    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
  >
    ➤
  </button>
</div>

</div>


      
    </>
  );
}

export default App;
