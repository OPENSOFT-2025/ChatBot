
import React from "react";
import { format } from "date-fns";
import { Conversation } from "@/components/chat/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";

interface ConversationListItemProps {
  conversation: Conversation;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation }) => {
  // Get the first message date to use as conversation date
  const conversationDate = conversation.lastMessage?.timestamp || new Date();
  
  return (
<div 
  className="flex items-start p-3 rounded-lg cursor-pointer transition duration-100 hover:bg-[rgba(38,137,13,0.3)]"
>

      <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
        <AvatarImage src={conversation.participants[1]?.avatar} />
        <AvatarFallback>
          {conversation.isGroup ? "G" : conversation.participants[1]?.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium text-sm truncate">
            {conversation.name || conversation.participants[1]?.name || "Conversation"}
          </h4>
          <span className="text-xs text-muted-foreground">
            {format(conversationDate, "MMM d")}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{format(conversationDate, "h:mm a")}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
