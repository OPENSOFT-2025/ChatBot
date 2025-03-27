
import React from "react";
import { Message } from "./ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Check, Clock } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar: boolean;
  showTimestamp: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
  showAvatar,
  showTimestamp,
}) => {
  const { content, timestamp, status, sender, attachments } = message;

  const getStatusIcon = () => {
    if (!isCurrentUser) return null;

    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-muted-foreground" />
            <Check className="h-3 w-3 text-muted-foreground -ml-1" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 text-blue-500 -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return "";

    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[80%]`}
      >
        {showAvatar ? (
          <Avatar
            className={`h-8 w-8 ${isCurrentUser ? "ml-2" : "mr-2"} mt-1 flex-shrink-0`}
          >
            <AvatarImage src={sender.avatar} alt={sender.name} />
            <AvatarFallback className={isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"}>
              {sender.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={`w-8 ${isCurrentUser ? "ml-2" : "mr-2"}`} />
        )}

        <div className="relative">
          <div
            className={`
              rounded-lg px-3 py-2 inline-block
              ${
                isCurrentUser
                  ? "deloitte-gradient text-white rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              }
            `}
          >
            {/* Arrow for user message (right side) */}
            {isCurrentUser && (
              <div className="absolute -right-2 bottom-0 w-4 h-4 overflow-hidden">
                <div className="absolute rotate-45 transform origin-bottom-left bg-[#86bc25] w-3 h-3 bottom-0 left-0"></div>
              </div>
            )}
            
            {/* Arrow for bot message (left side) */}
            {!isCurrentUser && (
              <div className="absolute -left-2 bottom-0 w-4 h-4 overflow-hidden">
                <div className="absolute rotate-45 transform origin-bottom-right bg-secondary w-3 h-3 bottom-0 right-0"></div>
              </div>
            )}
            
            {attachments && attachments.length > 0 && (
              <div className="mb-2 space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index}>
                    {attachment.type === "image" ? (
                      <img
                        src={attachment.url}
                        alt={attachment.name || "Attachment"}
                        className="rounded-md max-w-xs max-h-60 object-contain"
                      />
                    ) : (
                      <div className="flex items-center bg-background/10 rounded-md p-2">
                        <div className="bg-background/20 rounded p-2 mr-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V8H20"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 13H8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 17H8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 9H9H8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">
                            {attachment.name}
                          </p>
                          <p className="text-xs opacity-70">
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="whitespace-pre-wrap break-words">{content}</p>
          </div>

          {showTimestamp && (
            <div
              className={`flex items-center text-xs text-muted-foreground mt-1 ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <span>{formatTime(timestamp)}</span>
              {getStatusIcon() && (
                <span className="ml-1">{getStatusIcon()}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
