"use client";
import { z } from 'zod';
import React, {useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UsersAuth } from './context/AuthContext.js';
import { FcGoogle } from "react-icons/fc";
import { FaPaperPlane, FaArrowDown, FaMicrophone } from "react-icons/fa";

export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm your assistant, and I'll be your guide today.", sender: "bot" },
    { text: "What interests you about customer communications?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dots, setDots] = useState(".");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const previousScrollHeightRef = useRef(0);
  const { user, googleSignIn, logOut } = UsersAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
  const loginSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(50),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, including letters, numbers, and special characters"
    ).max(20),
  });
  const registerSchema = z.object({
    employeeId: z.string().max(50).min(1),
    name: z.string().max(50).min(1),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(50),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, including letters, numbers, and special characters"
    ).max(20),
    confirmPassword: z.string().max(20),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  const [RegisterformData, setRegisterFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [LoginformData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [Loginerrors, setLoginErrors] = useState({
    email: 0,
    password: 0
  });
  const [Registererrors, setRegisterErrors] = useState({
    employeeId: 0,
    name: 0,
    email: 0,
    password: 0,
    confirmPassword: 0,
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...LoginformData, [name]: value };
    setLoginFormData(updatedFormData);
    let result = loginSchema.safeParse(updatedFormData);
    let newError = { email: 0, password: 0 };
    if (!result.success) {
      result.error.errors.forEach(err => {
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
      });
    }
    setLoginErrors(newError);
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...RegisterformData, [name]: value };
    setRegisterFormData(updatedFormData);
    console.log(updatedFormData);
    let result = registerSchema.safeParse(updatedFormData);
    console.log(result);
    let newError = {
      employeeId: 0,
      name: 0,
      email: 0,
      password: 0,
      confirmPassword: 0,
    };
    if (!result.success) {
      result.error.errors.forEach(err => {
        if (err.path.includes("employeeId")) newError.employeeId = 1;
        if (err.path.includes("name")) newError.name = 1;
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
        if (err.path.includes("confirmPassword")) newError.confirmPassword = 1;
      });
    }
    setRegisterErrors(newError);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let result = loginSchema.safeParse(LoginformData);
    console.log(result);
    if (result.success) {
      console.log("form submitted");
    } else {
      let newError = { email: 0, password: 0 };
      result.error.errors.forEach(err => {
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
      });
      setLoginErrors(newError);
    }
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let result = registerSchema.safeParse(RegisterformData);
    console.log(result);
    if (result.success) {
      console.log("form submitted");
    } else {
      let newError = {
        employeeId: 0,
        name: 0,
        email: 0,
        password: 0,
        confirmPassword: 0,
      };
      result.error.errors.forEach(err => {
        if (err.path.includes("employeeId")) newError.employeeId = 1;
        if (err.path.includes("name")) newError.name = 1;
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
        if (err.path.includes("confirmPassword")) newError.confirmPassword = 1;
      });
      setRegisterErrors(newError);
    }
  };
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      const chatBox = chatBoxRef.current;
      const { scrollTop, clientHeight, scrollHeight } = chatBox;
      if (scrollTop + clientHeight >= previousScrollHeightRef.current - 10) {
        chatBox.scrollTop = scrollHeight;
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
      previousScrollHeightRef.current = scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
        setIsAtBottom(atBottom);
      }
    };
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
    setIsInputActive(false);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Great choice! Which industry are you in? Or what specific challenges or use cases would you like to address?", sender: "bot" }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsInputActive(e.target.value.length > 0);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const handleMicClick = () => {
    console.log("Microphone icon clicked! Add your voice input logic here.");
  };

  return (
    <>
      <div className='flex gap-5 h-50 justify-center items-center bg-gray-900'>
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setLoginOpen(true)}>Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Login</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-3">
              <div className="grid grid-cols-4 items-center gap-4 mb-3">
                <Label htmlFor="registerEmail" className="text-right">
                  Email
                </Label>
                <Input id="registerEmail" name="email" type="email" className="col-span-3" placeholder='JohnDoe@gmail.com' onChange={handleLoginChange} required="" />
              </div>
              {Loginerrors.email ? <p className="text-red-500 text-xs">Enter valid email.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerPassword" className="text-right">
                  Password
                </Label>
                <Input id='registerPassword' name="password" type="password" className="col-span-3" placeholder='••••••••' onChange={handleLoginChange} required="" />
              </div>
              {Loginerrors.password ? <p className="text-red-500 text-xs">Password must contain at least 8 characters, including letters, numbers, and special characters</p> : <></>}
            </div>
            <DialogDescription></DialogDescription>
            <DialogFooter>
              <Button className="cursor-pointer bg-gray-50 hover:bg-gray-200" type="submit" onClick={handleLoginSubmit}>Submit</Button>
            </DialogFooter>
            <div className='m-auto h-0.5 w-5/6 bg-gray-500'></div>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignIn}>SignIn with Google <FcGoogle size={24} /></Button>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account yet? &nbsp;
              <span
                className="font-medium text-[#2563eb] hover:underline dark:text-[#60a5fa] cursor-pointer"
                onClick={handleSwitchToRegister}
              >
                Register
              </span>
            </p>
          </DialogContent>
        </Dialog>
        {/* Register Dialog */}
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setRegisterOpen(true)}>Register</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center'>Register</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerEmployeeId" className="text-right">
                  Employee Id
                </Label>
                <Input id="registerEmployeeId" name="employeeId" type="text" className="col-span-3" onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.employeeId ? <p className="text-red-500 w-auto text-xs">Enter valid Employee Id.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerName" className="text-right">
                  Name
                </Label>
                <Input id="registerName" name="name" type="text" className="col-span-3" onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.name ? <p className="text-red-500 text-xs">Enter valid Name.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerEmail" className="text-right">
                  Email
                </Label>
                <Input id="registerEmail" name="email" type="email" className="col-span-3" placeholder='JohnDoe@gmail.com' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.email ? <p className="text-red-500 text-xs">Enter valid email.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerPassword" className="text-right">
                  Password
                </Label>
                <Input id='registerPassword' name="password" type="password" className="col-span-3" placeholder='••••••••' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.password ? <p className="text-red-500 text-xs">Password must contain at least 8 characters, including letters, numbers, and special characters</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerConfirmPassword" className="text-left">
                  Confirm Password
                </Label>
                <Input id="registerConfirmPassword" name="confirmPassword" type="password" className="col-span-3" placeholder='••••••••' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.confirmPassword ? <p className="text-red-500 text-xs">Passwords Don&apos;t match </p> : <></>}
            </div>
            <DialogFooter>
              <Button className="cursor-pointer bg-gray-50 hover:bg-gray-200" type="submit" onClick={handleRegisterSubmit}>Submit</Button>
            </DialogFooter>
            <div className='m-auto h-0.5 w-5/6 bg-gray-500'></div>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignIn}>SignIn with Google <FcGoogle size={24} /></Button>
          </DialogContent>
        </Dialog>
      </div>

      <div style={styles.pageContainer}>
        <style>
          {`
                .icon-wrapper:hover {
                  border: 2px solid #26890d !important;
                }
                /* Custom scrollbar styles */
                .custom-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #232323 #000000; /* Updated thumb color to #232323 */
                }
                .custom-scroll::-webkit-scrollbar {
                  width: 8px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                  background: #000000; /* Track remains black */
                  border-radius: 4px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                  background: #232323; /* Updated thumb color to #232323 */
                  border-radius: 4px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                  background: #333; /* Hover color remains #333 */
                }
              `}
        </style>
        <div style={styles.container}>
          <div style={styles.chatBox} ref={chatBoxRef} className="custom-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "bot" && (
                  <div style={styles.botAvatar}>
                    <div style={styles.avatar}>A</div>
                  </div>
                )}
                <div
                  style={{
                    ...styles.messageContainer,
                    maxWidth: msg.sender === "bot" ? "50%" : "60%",
                    marginRight: msg.sender === "user" ? "8px" : "0", // Fixed distance from user DP
                  }}
                >
                  <div style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
                    {msg.text}
                    {index === messages.length - 1 && msg.sender === "bot" && (
                      <div style={styles.timestamp}></div>
                    )}
                  </div>
                  <div
                    style={msg.sender === "user" ? styles.userMsgTail : styles.botMsgTail}
                  ></div>
                </div>
                {msg.sender === "user" && (
                  <div style={styles.userAvatar}>
                    <div style={styles.avatar}>U</div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={styles.messageRow}>
                <div style={styles.botAvatar}>
                  <div style={styles.avatar}>A</div>
                </div>
                <div style={styles.messageContainer}>
                  <div style={styles.typingIndicator}>Typing{dots}</div>
                  <div style={styles.botMsgTail}></div>
                </div>
              </div>
            )}

            {messages.length === 2 && (
              <div style={styles.optionsContainer}>
                <button style={styles.optionButton}>
                  An AI chatbot to suggest products, generate leads, or handle customer inquiries
                </button>
                <button style={styles.optionButton}>Omnichannel business messaging</button>
                <button style={{ ...styles.optionButton, ...styles.activeOptionButton }}>
                  Secure and scalable in-app chat
                </button>
              </div>
            )}
          </div>

          {!isAtBottom && (
            <div style={styles.scrollToBottomButton} onClick={scrollToBottom}>
              <FaArrowDown style={styles.scrollIcon} />
            </div>
          )}

          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                style={{
                  ...styles.input,
                  border: isInputActive ? "1px solid #26890d" : "1px solid #333",
                }}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                ref={inputRef}
              />
              <FaPaperPlane
                onClick={handleSendMessage}
                style={{
                  ...styles.actionIcon,
                  color: isInputActive ? "#26890d" : "#fff",
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
            <div style={styles.iconWrapper} className="mic-wrapper">
              <FaMicrophone
                onClick={handleMicClick}
                style={{ ...styles.actionIcon, color: "#000000" }} // Black microphone
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#131313",
  },
  container: {
    width: "690px",
    height: "650px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    border: "1px solid #333",
    borderRadius: "20px",
    backgroundColor: "#252525",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
    position: "relative",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  messageRow: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
  },
  botAvatar: {
    marginRight: "8px",
    alignSelf: "flex-start",
  },
  userAvatar: {
    marginLeft: "8px",
    alignSelf: "flex-start",
  },
  messageContainer: {
    position: "relative",
    marginTop: "20px",
  },
  userMsg: {
    backgroundColor: "#005C4B",
    color: "white",
    padding: "10px 15px",
    borderRadius: "12px 17px 4px 12px",
    maxWidth: "180px", // Set maxWidth to control wrapping
    display: "inline-block", // Background only around text
    textAlign: "left", // Align text to the left
    position: "relative",
    alignSelf: "flex-end",
    wordBreak: "break-word",
    hyphens: "auto",
    WebkitHyphens: "auto",
    MozHyphens: "auto",
  },
  userMsgTail: {
    content: "''",
    position: "absolute",
    top: "-0.1px",
    right: "-8px",
    width: "24px",
    height: "35.55px",
    backgroundColor: "#005C4B",
    clipPath: "polygon(100% 0, 0 0, 0 100%)",
  },
  botMsg: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px 15px",
    borderRadius: "12px 12px 12px 4px",
    maxWidth: "50%",
    position: "relative",
    alignSelf: "flex-start",
    wordBreak: "break-word",
    hyphens: "auto",
    WebkitHyphens: "auto",
    MozHyphens: "auto",
  },
  botMsgTail: {
    content: "''",
    position: "absolute",
    top: "-0.2px",
    left: "-6px",
    width: "16px",
    height: "29px",
    backgroundColor: "#333",
    clipPath: "polygon(0 0, 100% 0, 100% 100%)",
  },
  timestamp: {
    position: "absolute",
    right: "8px",
    bottom: "-18px",
    fontSize: "10px",
    color: "#999",
  },
  typingIndicator: {
    backgroundColor: "#333",
    color: "#26890d",
    padding: "8px 15px",
    borderRadius: "18px",
    fontSize: "14px",
    maxWidth: "50%",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
    width: "100%",
  },
  optionButton: {
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #26890d",
    backgroundColor: "transparent",
    color: "#26890d",
    fontSize: "13px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s ease",
  },
  activeOptionButton: {
    backgroundColor: "#26890d",
    color: "white",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #333",
    backgroundColor: "#252525",
    justifyContent: "space-between",
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
    marginRight: "10px",
  },
  input: {
    padding: "12px 40px 12px 15px",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#131313",
    color: "white",
    transition: "all 0.3s ease",
    width: "100%",
    boxSizing: "border-box",
  },
  actionIcon: {
    fontSize: "18px",
    cursor: "pointer",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "28px",
    height: "28px",
    border: "2px solid transparent",
    transition: "border 0.2s ease",
    backgroundColor: "#26890d", // Permanent green background
    borderRadius: "50%", // Circular shape
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: "100px",
    right: "20px",
    width: "40px",
    height: "40px",
    backgroundColor: "#26890d",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  scrollIcon: {
    color: "white",
    fontSize: "20px",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#26890d",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

