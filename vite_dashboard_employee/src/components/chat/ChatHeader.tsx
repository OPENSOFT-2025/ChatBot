
import React from "react";
import { useChat } from "./ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Search, MoreVertical, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ChatHeader: React.FC = () => {
  const { activeConversation, currentUser } = useChat();

  if (!activeConversation) return null;

  const isGroup = activeConversation.isGroup;
  const otherParticipant = activeConversation.participants.find(
    (p) => p.id !== currentUser.id,
  );

  const name = isGroup
    ? activeConversation.name || "Group Chat"
    : otherParticipant?.name || "Unknown";

  const avatar = isGroup
    ? "" // Group avatar logic would go here
    : otherParticipant?.avatar || "";

  const status = isGroup
    ? `${activeConversation.participants.length} members`
    : otherParticipant?.status === "online"
      ? "Online"
      : otherParticipant?.status === "away"
        ? "Away"
        : otherParticipant?.lastSeen
          ? `Last seen ${formatDistanceToNow(otherParticipant.lastSeen, { addSuffix: true })}`
          : "Offline";

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background deloitte-header">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-accent text-accent-foreground">{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-semibold">{name}</h2>
          <p className="text-xs text-muted-foreground">{status}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
