import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Users, MessageSquare, Clock, Activity } from "lucide-react";

// Mock data for the admin dashboard
const departmentMoodData = [
  { name: "Marketing", value: 4.2, color: "#00A300" },
  { name: "Engineering", value: 3.8, color: "#8BD100" },
  { name: "Sales", value: 3.5, color: "#D1BA00" },
  { name: "Customer Service", value: 3.2, color: "#FF8C00" },
  { name: "Finance", value: 2.9, color: "#FF2700" },
];

const monthlyTrendData = [
  { month: "Jan", avgMood: 3.8, participation: 72 },
  { month: "Feb", avgMood: 3.7, participation: 68 },
  { month: "Mar", avgMood: 3.5, participation: 75 },
  { month: "Apr", avgMood: 3.2, participation: 78 },
  { month: "May", avgMood: 3.4, participation: 80 },
  { month: "Jun", avgMood: 3.6, participation: 85 },
];

const topConcernsData = [
  { concern: "Work-Life Balance", count: 87 },
  { concern: "Workload", count: 65 },
  { concern: "Team Communication", count: 52 },
  { concern: "Career Growth", count: 48 },
  { concern: "Recognition", count: 41 },
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">HR Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor employee well-being and engagement metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select defaultValue="month" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Average Mood Score"
          value="3.6/5"
          change={-0.2}
          icon={<Activity className="h-5 w-5" />}
          timeRange={timeRange}
        />
        
        <MetricCard 
          title="Participation Rate"
          value="78%"
          change={5}
          icon={<Users className="h-5 w-5" />}
          timeRange={timeRange}
        />
        
        <MetricCard 
          title="Total Conversations"
          value="1,243"
          change={12}
          icon={<MessageSquare className="h-5 w-5" />}
          timeRange={timeRange}
        />
        
        <MetricCard 
          title="Avg. Response Time"
          value="2.4 hrs"
          change={-0.5}
          icon={<Clock className="h-5 w-5" />}
          timeRange={timeRange}
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Mood Trend</CardTitle>
                <CardDescription>Average mood score over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" domain={[0, 5]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgMood" name="Avg. Mood (1-5)" fill="hsl(var(--primary))" />
                    <Bar yAxisId="right" dataKey="participation" name="Participation %" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Mood Scores</CardTitle>
                <CardDescription>Average mood by department</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentMoodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {departmentMoodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Employee Concerns</CardTitle>
                <CardDescription>Most frequently mentioned topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topConcernsData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{item.concern}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-[150px] bg-secondary h-3 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-3" 
                            style={{ width: `${(item.count / topConcernsData[0].count) * 100}%` }} 
                          />
                        </div>
                        <span className="text-sm">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>Employees requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-destructive/10 text-destructive rounded-lg">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">High Burnout Risk</h4>
                        <span className="text-xs">3 employees</span>
                      </div>
                      <p className="text-sm opacity-80">Consecutive low mood scores and extended hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Engagement Concerns</h4>
                        <span className="text-xs">5 employees</span>
                      </div>
                      <p className="text-sm opacity-80">Declining participation in team activities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-primary/10 text-primary rounded-lg">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Leadership Support</h4>
                        <span className="text-xs">2 teams</span>
                      </div>
                      <p className="text-sm opacity-80">Feedback indicates need for more manager support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="departments">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">Department breakdown view</h3>
            <p className="text-muted-foreground">
              Detailed analytics for each department will appear here
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">AI-driven insights</h3>
            <p className="text-muted-foreground">
              Automated analysis and recommendations will appear here
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="flagged">
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-2">Flagged cases requiring attention</h3>
            <p className="text-muted-foreground">
              High-priority cases that need HR intervention will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  timeRange: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, timeRange }) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground text-sm">{title}</span>
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(change)}% from previous {timeRange}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
