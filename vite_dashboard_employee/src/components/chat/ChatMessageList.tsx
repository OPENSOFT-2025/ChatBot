
import React, { useEffect, useRef } from "react";
import { useChat } from "./ChatContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { format } from "date-fns";
import { Message } from "./ChatContext";

const ChatMessageList: React.FC = () => {
  const { messages, currentUser } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = format(message.timestamp, "MMMM d, yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {} as Record<string, Message[]>,
  );

  // Group consecutive messages from the same sender
  const groupConsecutiveMessages = (messageList: Message[]) => {
    return messageList.reduce(
      (result, message, index, array) => {
        if (index === 0) {
          result.push([message]);
          return result;
        }

        const lastGroup = result[result.length - 1];
        const lastMessage = lastGroup[lastGroup.length - 1];

        // Check if messages are from the same sender and within 5 minutes of each other
        if (
          message.sender.id === lastMessage.sender.id &&
          Math.abs(
            message.timestamp.getTime() - lastMessage.timestamp.getTime(),
          ) <
            5 * 60 * 1000
        ) {
          lastGroup.push(message);
        } else {
          result.push([message]);
        }

        return result;
      },
      [] as Message[][],
    );
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-6">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center mb-4">
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                {date}
              </span>
            </div>

            <div className="space-y-4">
              {groupConsecutiveMessages(dateMessages).map(
                (group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.map((message, messageIndex) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isCurrentUser={message.sender.id === currentUser.id}
                        showAvatar={messageIndex === group.length - 1}
                        showTimestamp={messageIndex === group.length - 1}
                      />
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
