
import React, { useState, useEffect } from "react";
import { HRBarChart } from "@/components/hr/BarChart";
import { HRPieChart } from "@/components/hr/PieChart";
import { Sidebar } from "@/components/hr/Sidebar";
import { EmployeeTable } from "@/components/hr/EmployeeTable";
import { StatsCard } from "@/components/hr/StatsCard";
import { ChallengeContent } from "@/components/hr/ChallengeContent";
import { Users, FileText, CalendarDays, Clock, Brain } from "lucide-react";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-hr-light overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`flex-1 transition-all duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-6 space-y-6">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${isLoaded ? 'scale-in' : 'opacity-0'}`}>
            <StatsCard 
              title="Vibe Meter"
              value="AI Solution"
              description="Employee engagement tracking"
              icon={<Brain size={16} />}
              trend="up"
              className="lg:col-span-1 animate-slide-in-left"
              style={{ animationDelay: '0.1s' }}
            />
            <StatsCard 
              title="Total Employees"
              value="35,000+"
              description="Surveyed every alternate day"
              icon={<Users size={16} />}
              trend="neutral"
              className="lg:col-span-1 animate-slide-in-left"
              style={{ animationDelay: '0.2s' }}
            />
            <StatsCard 
              title="Emotion Zones"
              value="5"
              description="From Frustrated to Excited"
              icon={<CalendarDays size={16} />}
              trend="up"
              className="lg:col-span-1 animate-slide-in-left"
              style={{ animationDelay: '0.3s' }}
            />
            <StatsCard 
              title="Data Sources"
              value="6"
              description="Leave, Activity, Rewards, etc."
              icon={<Clock size={16} />}
              trend="up"
              className="lg:col-span-1 animate-slide-in-left"
              style={{ animationDelay: '0.4s' }}
            />
            <StatsCard 
              title="Turnaround Goal"
              value="Faster"
              description="Using AI automation"
              icon={<FileText size={16} />}
              trend="up"
              className="lg:col-span-1 animate-slide-in-left"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          
          <div className={`${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <ChallengeContent />
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isLoaded ? 'scale-in' : 'opacity-0'}`}>
            <HRPieChart />
            <HRBarChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
