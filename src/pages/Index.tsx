
import React, { useState, useEffect, useRef } from "react";
import { HRBarChart } from "@/components/hr/BarChart";
import { HRPieChart } from "@/components/hr/PieChart";
import { Sidebar } from "@/components/hr/Sidebar";
import { EmployeeTable } from "@/components/hr/EmployeeTable";
import { EmployeeReports } from "@/components/hr/EmployeeReports";
import { StatsCard } from "@/components/hr/StatsCard";
import { Users, FileText, CalendarDays, Clock, BarChart as BarChartIcon, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
              <BarChartIcon size={24} className="text-hr-green" />
              Vibemeter Dashboard
            </h2>

            <Card className="bg-hr-black border border-hr-green/20 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-hr-green flex items-center gap-2">
                  <BrainCircuit size={20} />
                  Vibemeter AI Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 max-h-[300px] overflow-y-auto hr-custom-scrollbar">
                <p>
                  In large organizations, tracking employee well-being and engagement is essential for 
                  maintaining productivity and a positive work culture. The Vibemeter tracks the mood 
                  of employees in 5 different zones, from lowest to highest - <span className="text-red-500 font-medium">Frustrated</span>, 
                  <span className="text-orange-400 font-medium"> Sad</span>, <span className="text-blue-400 font-medium">Okay</span>, 
                  <span className="text-green-400 font-medium"> Happy</span>, <span className="text-hr-green font-bold"> Excited</span>.
                </p>
                <p>
                  This helps us do a daily check on the culture, and provide actionable feedback to 
                  managers, teams and business units to engage employees more effectively, keeping them happy.
                </p>
                <p className="font-medium text-hr-green">Our Current Data Analysis Process:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Data Analysis:</span> We connect Vibemeter data to several other input sources
                    (performance, leaves, activity tracker, promotions) to identify core employee issues.
                  </li>
                  <li>
                    <span className="font-medium">Post-analysis Feedback:</span> We gather feedback via individual meetings and focus groups.
                  </li>
                </ol>
                <p className="text-hr-green font-medium">Our AI Solution Aims To:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Connect with employees to understand their concerns</li>
                  <li>Gather and correlate data from multiple sources</li>
                  <li>Provide personalized responses to employee situations</li>
                  <li>Analyze feedback and escalate serious concerns when needed</li>
                  <li>Create detailed reports for the People Experience team</li>
                </ul>
              </CardContent>
            </Card>

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
                  <EmployeeTable />
                </TabsContent>
                <TabsContent value="unflagged">
                  <EmployeeTable />
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
