import React, { createContext, useContext, useState, useEffect } from "react";

export type MessageStatus = "sending" | "sent" | "delivered" | "read";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: User;
  status: MessageStatus;
  attachments?: {
    type: "image" | "file";
    url: string;
    name?: string;
    size?: number;
  }[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  name?: string;
}

interface ChatContextType {
  currentUser: User;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  setActiveConversation: (conversation: Conversation) => void;
  sendMessage: (content: string, attachments?: any[]) => void;
}

const defaultUser: User = {
  id: "user-1",
  name: "John Doe",
  avatar: "https://github.com/shadcn.png",
  status: "online",
};

const mockUsers: User[] = [
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
    status: "online",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    avatar: "https://ui-avatars.com/api/?name=Robert+Johnson",
    status: "away",
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "user-4",
    name: "Emily Davis",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis",
    status: "offline",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    avatar: "https://ui-avatars.com/api/?name=Michael+Wilson",
    status: "online",
  },
  {
    id: "user-6",
    name: "Design Team",
    avatar: "https://ui-avatars.com/api/?name=Design+Team",
    status: "online",
  },
];

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [defaultUser, mockUsers[0]],
    unreadCount: 3,
    isGroup: false,
  },
  {
    id: "conv-2",
    participants: [defaultUser, mockUsers[1]],
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "conv-3",
    participants: [defaultUser, mockUsers[2]],
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "conv-4",
    participants: [defaultUser, mockUsers[3]],
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "conv-5",
    participants: [defaultUser, ...mockUsers.slice(0, 3)],
    name: "Design Team",
    unreadCount: 5,
    isGroup: true,
  },
];

// Generate mock messages
const generateMockMessages = (conversation: Conversation): Message[] => {
  const otherUser =
    conversation.participants.find((p) => p.id !== defaultUser.id) ||
    mockUsers[0];

  return [
    {
      id: `msg-${conversation.id}-1`,
      content: "Hey there! How's it going?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sender: otherUser,
      status: "read",
    },
    {
      id: `msg-${conversation.id}-2`,
      content: "I'm doing well, thanks for asking! How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      sender: defaultUser,
      status: "read",
    },
    {
      id: `msg-${conversation.id}-3`,
      content: "Pretty good! Just working on that project we discussed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
      sender: otherUser,
      status: "read",
    },
    {
      id: `msg-${conversation.id}-4`,
      content: "Do you have time for a quick call later today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      sender: otherUser,
      status: "read",
    },
    {
      id: `msg-${conversation.id}-5`,
      content: "Sure, I'm free after 3pm. Does that work for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      sender: defaultUser,
      status: "delivered",
    },
  ];
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser] = useState<User>(defaultUser);
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Set initial active conversation and load messages
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      const firstConversation = conversations[0];
      setActiveConversation(firstConversation);
      setMessages(generateMockMessages(firstConversation));
    }
  }, [conversations, activeConversation]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      setMessages(generateMockMessages(activeConversation));

      // Mark conversation as read
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversation.id
            ? { ...conv, unreadCount: 0 }
            : conv,
        ),
      );
    }
  }, [activeConversation]);

  const sendMessage = (content: string, attachments: any[] = []) => {
    if (!activeConversation || !content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      sender: currentUser,
      status: "sending",
      attachments: attachments.map((att) => ({
        type: att.type.startsWith("image/") ? "image" : "file",
        url: URL.createObjectURL(att),
        name: att.name,
        size: att.size,
      })),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message sending
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg,
        ),
      );

      // Simulate message delivery
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }, 1000);
    }, 500);
  };

  const value = {
    currentUser,
    conversations,
    activeConversation,
    messages,
    setActiveConversation,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
