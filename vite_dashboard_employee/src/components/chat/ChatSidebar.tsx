
import React, { useState } from "react";
import { useChat, Conversation, User } from "./ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageSquare,
  Users,
  Phone,
  Video,
  Settings,
  PlusCircle,
  MoreVertical,
  Check,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ChatSidebar: React.FC = () => {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    currentUser,
  } = useChat();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipant = conversation.participants.find(
      (p) => p.id !== currentUser.id,
    );
    const name = conversation.isGroup
      ? conversation.name
      : otherParticipant?.name;

    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getConversationName = (conversation: Conversation): string => {
    if (conversation.isGroup) {
      return conversation.name || "Group Chat";
    }

    const otherParticipant = conversation.participants.find(
      (p) => p.id !== currentUser.id,
    );
    return otherParticipant?.name || "Unknown";
  };

  const getConversationAvatar = (conversation: Conversation): string => {
    if (conversation.isGroup) {
      return conversation.participants[0]?.avatar || "";
    }

    const otherParticipant = conversation.participants.find(
      (p) => p.id !== currentUser.id,
    );
    return otherParticipant?.avatar || "";
  };

  const getStatusIndicator = (user: User) => {
    switch (user.status) {
      case "online":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        );
      case "away":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 border-2 border-white" />
        );
      case "offline":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 border-2 border-white" />
        );
      default:
        return null;
    }
  };

  const getLastMessagePreview = (conversation: Conversation) => {
    if (!conversation.lastMessage) return "No messages yet";

    const { content, sender } = conversation.lastMessage;
    const isSelf = sender.id === currentUser.id;
    const prefix = isSelf ? "You: " : "";

    return `${prefix}${content.length > 25 ? content.substring(0, 25) + "..." : content}`;
  };

  const getLastMessageTime = (conversation: Conversation) => {
    if (!conversation.lastMessage) return "";

    return formatDistanceToNow(conversation.lastMessage.timestamp, {
      addSuffix: true,
    });
  };

  const getMessageStatusIcon = (conversation: Conversation) => {
    if (
      !conversation.lastMessage ||
      conversation.lastMessage.sender.id !== currentUser.id
    ) {
      return null;
    }

    switch (conversation.lastMessage.status) {
      case "sent":
        return <Check className="h-4 w-4 text-muted-foreground" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-4 w-4 text-muted-foreground" />
            <Check className="h-4 w-4 text-muted-foreground -ml-2" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check className="h-4 w-4 text-blue-500" />
            <Check className="h-4 w-4 text-blue-500 -ml-2" />
          </div>
        );
      case "sending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 border-r border-border flex flex-col h-full bg-sidebar">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between deloitte-gradient">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2 bg-white">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-white text-sidebar-primary font-bold">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-white">
              {currentUser.name}
            </h2>
            <p className="text-xs text-white/90">Deloitte Connect</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-sidebar-accent text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="chats" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 mx-4">
          <TabsTrigger value="chats" className="text-sidebar-foreground">
            <MessageSquare className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="groups" className="text-sidebar-foreground">
            <Users className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="calls" className="text-sidebar-foreground">
            <Phone className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="video" className="text-sidebar-foreground">
            <Video className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chats" className="flex-1 pt-2">
          <div className="flex items-center justify-between px-4 mb-2">
            <h3 className="font-medium text-sm text-sidebar-foreground">
              Team Members
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-sidebar-primary"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1 h-[calc(100vh-220px)]">
            <div className="px-2">
              {filteredConversations.map((conversation) => {
                const isActive = activeConversation?.id === conversation.id;
                const otherParticipant = conversation.participants.find(
                  (p) => p.id !== currentUser.id,
                );

                return (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage
                          src={getConversationAvatar(conversation)}
                          alt={getConversationName(conversation)}
                        />
                        <AvatarFallback>
                          {getConversationName(conversation).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {!conversation.isGroup &&
                        otherParticipant &&
                        getStatusIndicator(otherParticipant)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">
                          {getConversationName(conversation)}
                        </h4>
                        <span className="text-xs text-sidebar-foreground/70 whitespace-nowrap ml-1">
                          {getLastMessageTime(conversation)}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <p className="text-sm text-sidebar-foreground/70 truncate flex-1">
                          {getLastMessagePreview(conversation)}
                        </p>
                        <div className="flex items-center ml-1">
                          {getMessageStatusIcon(conversation)}

                          {conversation.unreadCount > 0 && (
                            <span className="ml-1 bg-sidebar-primary text-sidebar-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 pt-2">
          <div className="flex items-center justify-center h-full text-sidebar-foreground/70">
            <p>Deloitte team groups will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="calls" className="flex-1 pt-2">
          <div className="flex items-center justify-center h-full text-sidebar-foreground/70">
            <p>Call history will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="video" className="flex-1 pt-2">
          <div className="flex items-center justify-center h-full text-sidebar-foreground/70">
            <p>Video calls will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSidebar;
