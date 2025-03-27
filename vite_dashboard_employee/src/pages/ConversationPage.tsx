import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ConversationPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // Check if user is flagged for conversation
    const isUserFlagged = localStorage.getItem("isUserFlagged");
    if (isUserFlagged !== "true") {
      navigate("/dashboard");
      return;
    }
    
    // Add initial welcome message
    setMessages([
      {
        id: "welcome",
        content: "Welcome to your scheduled well-being check-in. How are you feeling today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, [navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      
      // Simulate bot response after a delay
      setTimeout(() => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: "Thank you for sharing. Could you tell me more about how your work has been going this week?",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // If speaker is on, read the message using speech synthesis
        if (isSpeakerOn) {
          const speech = new SpeechSynthesisUtterance(botMessage.content);
          window.speechSynthesis.speak(speech);
        }
      }, 1000);
    }
  };
  
  const toggleMicrophone = () => {
    setIsRecording(prev => !prev);
    
    if (!isRecording) {
      // Request microphone access when starting recording
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            // Would implement actual speech recognition here
            console.log("Microphone access granted", stream);
            // For demo, we'll just simulate voice input after 2 seconds
            setTimeout(() => {
              setInputValue("I'm feeling pretty good today, thanks for asking.");
              setIsRecording(false);
            }, 2000);
          })
          .catch(err => {
            console.error("Error accessing microphone:", err);
            setIsRecording(false);
          });
      }
    }
  };
  
  const toggleSpeaker = () => {
    setIsSpeakerOn(prev => !prev);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Main chat area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome message at the top */}
            <div className="text-center py-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">Deloitte Well-being Check-in</h1>
              <p className="text-muted-foreground">Your responses are confidential and will help us provide better support</p>
            </div>
            
            {/* Messages */}
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className="flex items-start max-w-[80%]">
                  {!message.isUser && (
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/favicon.ico" />
                      <AvatarFallback className="bg-deloitte-green text-black">DC</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="relative">
                    <div 
                      className={`px-4 py-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-deloitte-green text-black rounded-br-none' 
                          : 'bg-secondary text-foreground rounded-bl-none'
                      }`}
                    >
                      {/* Arrow for user message (right side) */}
                      {message.isUser && (
                        <div className="absolute -right-2 bottom-0 w-4 h-4 overflow-hidden">
                          <div className="absolute rotate-45 transform origin-bottom-left bg-deloitte-green w-3 h-3 bottom-0 left-0"></div>
                        </div>
                      )}
                      
                      {/* Arrow for bot message (left side) */}
                      {!message.isUser && (
                        <div className="absolute -left-2 bottom-0 w-4 h-4 overflow-hidden">
                          <div className="absolute rotate-45 transform origin-bottom-right bg-secondary w-3 h-3 bottom-0 right-0"></div>
                        </div>
                      )}
                      
                      <p>{message.content}</p>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  
                  {message.isUser && (
                    <Avatar className="h-10 w-10 ml-3">
                      <AvatarFallback className="bg-secondary">ME</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>
      
      {/* Input area */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSpeaker}
            className={`${!isSpeakerOn ? 'bg-destructive text-destructive-foreground' : ''}`}
          >
            {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[60px] max-h-[200px] resize-none bg-secondary text-foreground"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMicrophone}
            className={`${isRecording ? 'bg-destructive text-destructive-foreground' : ''}`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            className="bg-deloitte-green hover:bg-deloitte-green/90 text-black"
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
