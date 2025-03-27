
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { LogIn, Rocket } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const LandingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="flex justify-center mb-8">
          <img 
            src="/favicon.ico" 
            alt="Deloitte Logo" 
            className="h-20 w-auto" 
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">Welcome to Deloitte Connect</h1>
        <p className="text-xl text-muted-foreground">
          Your personal well-being assistant that helps you stay connected, engaged and supported.
        </p>
        
        <div className="pt-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-deloitte-green hover:bg-deloitte-green/90 text-black">
                <Rocket className="mr-2 h-5 w-5" />
                Let's Start
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background text-foreground">
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  Enter your employee credentials to continue
                </DialogDescription>
              </DialogHeader>
              <LoginForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Deloitte. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
