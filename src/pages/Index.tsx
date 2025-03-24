
import React, { useState, useEffect, useRef } from "react";
import { HRBarChart } from "@/components/hr/BarChart";
import { HRPieChart } from "@/components/hr/PieChart";
import { Sidebar } from "@/components/hr/Sidebar";
import { EmployeeTable } from "@/components/hr/EmployeeTable";
import { EmployeeReports } from "@/components/hr/EmployeeReports";
import { StatsCard } from "@/components/hr/StatsCard";
import { Users, FileText, CalendarDays, Clock, BarChart as BarChartIcon, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
              <BarChartIcon size={24} className="text-hr-green" />
              ANALYTICS DASHBOARD
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isLoaded ? 'scale-in' : 'opacity-0'}`}>
              <StatsCard 
                title="Total Employees"
                value="35,428"
                description="+142 from last month"
                icon={<Users size={16} />}
                trend="up"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.1s' }}
              />
              <StatsCard 
                title="Vibemeter Responses"
                value="28,342"
                description="80% participation rate"
                icon={<FileText size={16} />}
                trend="up"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.2s' }}
              />
              <StatsCard 
                title="Average Mood Score"
                value="3.7/5"
                description="+0.2 from last quarter"
                icon={<CalendarDays size={16} />}
                trend="up"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.3s' }}
              />
              <StatsCard 
                title="Flagged Concerns"
                value="246"
                description="-18% from last month"
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
              <div className="mb-4 flex items-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10 bg-hr-black border-hr-green/30 focus-visible:ring-hr-green/50"
                    placeholder="Search by employee ID or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="flagged" className="w-full">
                <TabsList className="grid w-[200px] grid-cols-2 mb-4">
                  <TabsTrigger value="flagged" className="data-[state=active]:bg-hr-green data-[state=active]:text-black">
                    Flagged
                  </TabsTrigger>
                  <TabsTrigger value="unflagged" className="data-[state=active]:bg-hr-green data-[state=active]:text-black">
                    Unflagged
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="flagged">
                  <EmployeeTable searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="unflagged">
                  <EmployeeTable searchQuery={searchQuery} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Reports Section */}
          <div id="reports-section" ref={reportsRef} className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold text-hr-green mb-4 flex items-center gap-2">
              <FileText size={24} className="text-hr-green" />
              Employee Reports
            </h2>
            
            <div className={`${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
              <div className="mb-4 flex items-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10 bg-hr-black border-hr-green/30 focus-visible:ring-hr-green/50"
                    placeholder="Search by employee ID or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="flagged" className="w-full">
                <TabsList className="grid w-[200px] grid-cols-2 mb-4">
                  <TabsTrigger value="flagged" className="data-[state=active]:bg-hr-green data-[state=active]:text-black">
                    Flagged
                  </TabsTrigger>
                  <TabsTrigger value="unflagged" className="data-[state=active]:bg-hr-green data-[state=active]:text-black">
                    Unflagged
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="flagged">
                  <EmployeeReports />
                </TabsContent>
                <TabsContent value="unflagged">
                  <EmployeeReports />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
