// src/app/dashboard/page.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MessageSquare, Clock, Menu } from "lucide-react";
import ConversationListItem from "@/components/history/ConversationListItem";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardPage = () => {
  const router = useRouter();
  const [pastConversations, setPastConversations] = useState([]);

  // Mock user data (in a real app, this would come from auth context or API)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // Simulate fetching past conversations
    setTimeout(() => {
      const mockConversations = [
        {
          id: "conv1",
          name: "Well-being Check-in",
          participants: [
            { id: "user1", name: "You", avatar: "", status: "online" },
            {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
          ],
          lastMessage: {
            id: "msg1",
            content:
              "Thank you for sharing your thoughts. I've noted your feedback.",
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            sender: {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
            status: "read",
          },
          isGroup: false,
          unreadCount: 0,
        },
        {
          id: "conv2",
          name: "Quarterly Review Preparation",
          participants: [
            { id: "user1", name: "You", avatar: "", status: "online" },
            {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
          ],
          lastMessage: {
            id: "msg2",
            content:
              "I've shared some resources to help you prepare for your upcoming review.",
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            sender: {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
            status: "read",
          },
          isGroup: false,
          unreadCount: 0,
        },
        {
          id: "conv3",
          name: "Stress Management Session",
          participants: [
            { id: "user1", name: "You", avatar: "", status: "online" },
            {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
          ],
          lastMessage: {
            id: "msg3",
            content:
              "Remember to practice the breathing techniques we discussed.",
            timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            sender: {
              id: "bot1",
              name: "Deloitte Connect",
              avatar: "/favicon.ico",
              status: "online",
            },
            status: "read",
          },
          isGroup: false,
          unreadCount: 0,
        },
      ];

      setPastConversations(mockConversations);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-0">
      <div className="w-full relative">
        {/* Hamburger Menu with DropdownMenu in top right corner */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className="h-8 w-8 text-foreground cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => router.push("/contact-us")}
              >
                Contact Us
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-destructive hover:bg-gray-700 transition-colors focus:text-destructive"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <header className="text-center mb-12 pt-16 px-4">
          <h1 className="text- text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Employee Dashboard
          </h1>
          <div className="glass-morphism py-6 px-4 rounded-lg w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              No Conversations Scheduled
            </h2>
            <p className="text-muted-foreground">
              You don't have any well-being check-ins scheduled at this time.
              Your next check-in will appear here.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4">
          <Card
            style={{ backgroundColor: "#26890d" }}
            className="text-foreground w-full"
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Next Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Not scheduled yet</p>
            </CardContent>
          </Card>

          <Card
            style={{ backgroundColor: "#26890d" }}
            className="bg-secondary text-foreground w-full"
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Total Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{pastConversations.length}</p>
            </CardContent>
          </Card>

          <Card
            style={{ backgroundColor: "#26890d" }}
            className="bg-secondary text-foreground w-full"
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Last Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {pastConversations.length > 0
                  ? new Date(
                      pastConversations[0]?.lastMessage?.timestamp || Date.now()
                    ).toLocaleDateString()
                  : "No recent activity"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-secondary text-foreground w-full mx-0">
          <div
            className="h-1 w-full mb-4 rounded-t-lg"
            style={{ backgroundColor: "#26890d" }}
          ></div>
          <CardHeader className="px-4">
            <CardTitle>Past Conversations</CardTitle>
            <CardDescription>
              Review your previous well-being check-ins
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <ScrollArea className="h-[400px] pr-4">
              {pastConversations.length > 0 ? (
                <div className="space-y-2">
                  {pastConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="cursor-pointer hover:bg-background/50 rounded-lg transition-colors"
                    >
                      <ConversationListItem conversation={conversation} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">
                    No past conversations found
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="px-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/resources")}
            >
              View Well-being Resources
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
