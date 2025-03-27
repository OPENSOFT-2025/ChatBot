
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search, BookOpen, FileText, Video, Bookmark, ExternalLink } from "lucide-react";

const ResourcesPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Well-being Resources</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search resources..." className="pl-9" />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              title="Managing Work-Life Balance"
              description="Learn practical strategies to maintain a healthy balance between work and personal life."
              type="article"
              time="5 min read"
            />
            
            <ResourceCard 
              title="Stress Management Techniques"
              description="Simple exercises and techniques to reduce stress and anxiety in the workplace."
              type="video"
              time="12 min watch"
            />
            
            <ResourceCard 
              title="Mindfulness for Professionals"
              description="How mindfulness practices can improve focus, productivity, and well-being."
              type="article"
              time="8 min read"
            />
            
            <ResourceCard 
              title="Building Resilience"
              description="Develop skills to bounce back from challenges and adapt to change."
              type="program"
              time="4 week course"
            />
            
            <ResourceCard 
              title="Effective Communication"
              description="Improve workplace relationships through better communication techniques."
              type="video"
              time="15 min watch"
            />
            
            <ResourceCard 
              title="Healthy Habits at Work"
              description="Simple habits to incorporate into your workday for better physical health."
              type="article"
              time="6 min read"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" /> Mental Well-being
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" /> Physical Health
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" /> Work Productivity
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" /> Team Collaboration
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" /> Leadership
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <ScrollArea className="h-[70vh]">
                <div className="space-y-4 pr-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <ArticleItem key={i} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">Video Resources</h3>
            <p className="text-muted-foreground">
              Video content about well-being topics will appear here
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="programs">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">Well-being Programs</h3>
            <p className="text-muted-foreground">
              Structured programs and courses will appear here
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">Your Saved Resources</h3>
            <p className="text-muted-foreground">
              Items you've bookmarked will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  type: "article" | "video" | "program";
  time: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, type, time }) => {
  const getIcon = () => {
    switch (type) {
      case "article": return <FileText className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "program": return <BookOpen className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="bg-primary/10 p-2 rounded-md text-primary">
            {getIcon()}
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{time}</span>
          <Button variant="link" size="sm" className="p-0 h-auto">
            View <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ArticleItem = () => {
  return (
    <div className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">The Importance of Regular Breaks</h3>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        Research shows that taking regular breaks improves productivity and reduces burnout. Learn how to implement an effective break schedule.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <FileText className="h-3 w-3 mr-1" />
          <span>4 min read</span>
        </div>
        <Button variant="link" size="sm" className="p-0 h-auto">
          Read Article <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ResourcesPage;
