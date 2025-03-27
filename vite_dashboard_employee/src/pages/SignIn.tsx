
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Lock, User, LogIn } from "lucide-react";

const formSchema = z.object({
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      password: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsLoading(true);
    
    // Simulate authentication - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, we'll just let any login succeed
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Welcome back",
        description: "You have successfully signed in",
      });
      navigate("/welcome");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-deloitte-green/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <img 
              src="/favicon.ico" 
              alt="Deloitte Logo" 
              className="h-12 w-auto" 
            />
          </div>
          <CardTitle className="text-2xl font-bold">Deloitte Connect</CardTitle>
          <CardDescription>
            Enter your employee credentials to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Employee ID</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your employee ID" 
                          className="pl-10" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          className="pl-10" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-deloitte-green hover:bg-deloitte-green/90" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Forgot password?
            </a>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            If you're experiencing issues with login, please contact IT support.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
