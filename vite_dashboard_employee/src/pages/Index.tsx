
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatLayout from "@/components/chat/ChatLayout";
import { ChatProvider } from "@/components/chat/ChatContext";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatProvider>
      <div className="min-h-screen">
        <ChatLayout />
      </div>
    </ChatProvider>
  );
};

export default Index;
