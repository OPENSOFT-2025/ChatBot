import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import EmployeeHistory from "./pages/EmployeeHistory";
import AdminDashboard from "./pages/AdminDashboard";
import ResourcesPage from "./pages/ResourcesPage";
import LandingPage from "./pages/LandingPage";
import ConversationPage from "./pages/ConversationPage";
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page is now the root */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Legacy sign-in page - kept for compatibility */}
          <Route path="/sign-in" element={<SignIn />} />
          
          {/* The two new primary routes after login */}
          <Route path="/conversation" element={
            <RequireAuth>
              <ConversationPage />
            </RequireAuth>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          } />
          
          {/* Other protected routes */}
          <Route path="/welcome" element={
            <RequireAuth>
              <Index />
            </RequireAuth>
          } />
          <Route path="/history" element={
            <RequireAuth>
              <EmployeeHistory />
            </RequireAuth>
          } />
          <Route path="/resources" element={
            <RequireAuth>
              <ResourcesPage />
            </RequireAuth>
          } />
          <Route path="/admin/dashboard" element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
