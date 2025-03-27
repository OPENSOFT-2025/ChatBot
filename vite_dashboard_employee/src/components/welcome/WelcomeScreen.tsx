
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, FileText, MessageSquare, Users } from "lucide-react";
import { useChat } from "@/components/chat/ChatContext";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const { currentUser } = useChat();
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="text-center mb-10">
        <img src="/favicon.ico" alt="Deloitte Logo" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Welcome to Deloitte Connect</h1>
        <p className="text-muted-foreground">Your well-being matters to us! Share your thoughts for personalized support.</p>
      </div>

      <Tabs defaultValue="welcome" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="welcome">Welcome</TabsTrigger>
          <TabsTrigger value="howItWorks">How It Works</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="getStarted">Get Started</TabsTrigger>
        </TabsList>

        <TabsContent value="welcome">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome, {currentUser.name}!</CardTitle>
              <CardDescription>
                We've created this platform to support your well-being and work-life balance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={<MessageSquare className="h-10 w-10 text-primary" />}
                  title="Personalized Chat"
                  description="Have meaningful conversations about your work experience and well-being."
                />
                <FeatureCard 
                  icon={<BarChart3 className="h-10 w-10 text-primary" />}
                  title="Track Your Progress"
                  description="Visualize your well-being journey over time."
                />
                <FeatureCard 
                  icon={<FileText className="h-10 w-10 text-primary" />}
                  title="Resources & Support"
                  description="Access helpful resources and connect with support when needed."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="howItWorks">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Deloitte Connect uses AI to provide personalized support and collect valuable feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Chat Regularly</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage in brief check-ins to share your experiences and well-being.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Get Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized insights and suggestions based on your conversations.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Take Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Access resources and support to improve your work-life balance.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setCurrentStep(3)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>
                Why Deloitte Connect is valuable for you and our organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" /> For You
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Personalized support for your well-being journey</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Track your mood and work-life balance over time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Discover resources tailored to your needs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Provide feedback in a safe, confidential environment</span>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" /> For Our Organization
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Better understand employee well-being needs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Identify trends to improve workplace culture</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Proactively address potential burnout or disengagement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-primary mr-2">•</div>
                      <span>Create data-driven well-being initiatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setCurrentStep(4)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="getStarted">
          <Card>
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Start your well-being journey with Deloitte Connect today.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="mb-6">
                <div className="deloitte-gradient text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your first chat awaits!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We'll start with a few questions to understand your current work experience and well-being.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={handleComplete} className="px-8 py-6">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-secondary/50 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default WelcomeScreen;
