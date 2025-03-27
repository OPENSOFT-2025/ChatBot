
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from "@/components/chat/ChatContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import ConversationListItem from "@/components/history/ConversationListItem";
import MoodTrend from "@/components/history/MoodTrend";

const EmployeeHistory = () => {
  const navigate = useNavigate();
  const { conversations, messages } = useChat();
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Conversation History</h1>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>
      
      <Tabs defaultValue="conversations">
        <TabsList className="mb-6">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="analytics">Well-being Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Recent Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-2">
                    {conversations.map((conversation) => (
                      <ConversationListItem 
                        key={conversation.id} 
                        conversation={conversation}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Conversation Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender.id === "user-1" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender.id === "user-1" 
                                ? "deloitte-gradient text-white" 
                                : "bg-secondary"
                            }`}
                          >
                            <p>{message.content}</p>
                            <div className="text-xs mt-1 flex items-center opacity-70">
                              <Clock className="h-3 w-3 mr-1" />
                              {format(message.timestamp, "h:mm a, MMM d")}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">Select a conversation to view its transcript</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <MoodTrend />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Well-being Factors</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Well-being factor visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Work-Life Balance</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your conversations, we've noticed you've been working longer hours recently.
                  </p>
                  <div className="bg-background p-3 rounded border text-sm">
                    <strong>Recommendation:</strong> Consider blocking time in your calendar for breaks and personal activities to maintain a healthy balance.
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Team Collaboration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your interactions show positive engagement with your team members.
                  </p>
                  <div className="bg-background p-3 rounded border text-sm">
                    <strong>Insight:</strong> Strong team relationships contribute significantly to overall job satisfaction and productivity.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeHistory;
