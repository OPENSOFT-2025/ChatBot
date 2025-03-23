
import React, { useState, useEffect, useRef } from "react";
import { HRBarChart } from "@/components/hr/BarChart";
import { HRPieChart } from "@/components/hr/PieChart";
import { Sidebar } from "@/components/hr/Sidebar";
import { EmployeeTable } from "@/components/hr/EmployeeTable";
import { EmployeeReports } from "@/components/hr/EmployeeReports";
import { StatsCard } from "@/components/hr/StatsCard";
import { Users, FileText, CalendarDays, Clock } from "lucide-react";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-hr-black overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`flex-1 transition-all duration-300 ease-in-out overflow-y-auto hr-custom-scrollbar`}>
        <div className="p-6 space-y-8">
          {/* Analytics Section */}
          <div id="analytics-section" ref={analyticsRef} className="space-y-6">
            <h2 className="text-2xl font-bold text-hr-green mb-4 flex items-center gap-2">
              <BarChart size={24} className="text-hr-green" />
              Analytics Dashboard
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isLoaded ? 'scale-in' : 'opacity-0'}`}>
              <StatsCard 
                title="Total Employees"
                value="1,486"
                description="+12 from last month"
                icon={<Users size={16} />}
                trend="up"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.1s' }}
              />
              <StatsCard 
                title="Open Positions"
                value="24"
                description="8 in technical roles"
                icon={<FileText size={16} />}
                trend="neutral"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.2s' }}
              />
              <StatsCard 
                title="Time to Hire"
                value="21 days"
                description="-3 days from last quarter"
                icon={<CalendarDays size={16} />}
                trend="up"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.3s' }}
              />
              <StatsCard 
                title="Retention Rate"
                value="94.6%"
                description="-1.2% from last year"
                icon={<Clock size={16} />}
                trend="down"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
            
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isLoaded ? 'scale-in' : 'opacity-0'}`}>
              <HRPieChart />
              <HRBarChart />
            </div>
            
            <div className={`${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <EmployeeTable />
            </div>
          </div>
          
          {/* Reports Section */}
          <div id="reports-section" ref={reportsRef} className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold text-hr-green mb-4 flex items-center gap-2">
              <FileText size={24} className="text-hr-green" />
              Employee Reports
            </h2>
            
            <div className={`${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
              <EmployeeReports />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
