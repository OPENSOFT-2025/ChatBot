
import React from "react";
import { Link } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useChat } from "./ChatContext";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, MessageSquare } from "lucide-react";

const ChatLayout: React.FC = () => {
  const { activeConversation } = useChat();

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {activeConversation ? (
          <>
            <ChatHeader />
            <ChatMessageList />
            <ChatInput />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-xl px-4">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome to Deloitte Connect
              </h2>
              <p className="text-muted-foreground mb-8">
                Your well-being matters to us. Choose a conversation from the sidebar to start chatting, or explore these resources:
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button asChild className="flex items-center gap-2">
                  <Link to="/history">
                    <FileText className="h-5 w-5" />
                    View Conversation History
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link to="/resources">
                    <MessageSquare className="h-5 w-5" />
                    Browse Well-being Resources
                  </Link>
                </Button>
                
                <Button asChild variant="secondary" className="flex items-center gap-2">
                  <Link to="/admin/dashboard">
                    <BarChart3 className="h-5 w-5" />
                    HR Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
