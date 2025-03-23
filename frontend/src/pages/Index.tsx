import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Bell,
  Settings,
  Home,
  BarChart2,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronUp,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UsersChart } from "@/components/dashboard/UsersChart";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
              D
            </div>
            Deloitte
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" active />
          <SidebarItem icon={<BarChart2 size={20} />} label="Analytics" />
          <SidebarItem icon={<Users size={20} />} label="Team" />
          <SidebarItem icon={<FileText size={20} />} label="Projects" />
          <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
          <SidebarItem icon={<MessageSquare size={20} />} label="Messages" />

          <div className="pt-6 mt-6 border-t border-sidebar-border">
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
            <SidebarItem icon={<HelpCircle size={20} />} label="Help" />
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">
                John Doe
              </p>
              <p className="text-xs text-sidebar-foreground/70">
                john@deloitte.com
              </p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut size={18} className="text-sidebar-foreground/70" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4 w-full max-w-md">
            <Search className="text-muted-foreground" size={20} />
            <Input
              placeholder="Search..."
              className="border-none shadow-none focus-visible:ring-0 pl-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, John! Here's what's happening today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filter
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Project
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value="$45,231.89"
                change="+20.1%"
                trend="up"
                description="Compared to last month"
              />
              <StatCard
                title="Active Users"
                value="2,420"
                change="+12.5%"
                trend="up"
                description="Compared to last month"
              />
              <StatCard
                title="Conversion Rate"
                value="3.8%"
                change="-4.2%"
                trend="down"
                description="Compared to last month"
              />
              <StatCard
                title="Active Projects"
                value="12"
                change="+2"
                trend="up"
                description="New this week"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Weekly active and new user counts</CardDescription>
                </CardHeader>
                <CardContent>
                  <UsersChart />
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="projects" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ProjectCard
                    title="Website Redesign"
                    description="Redesign the company website with new branding"
                    progress={75}
                    dueDate="Oct 28"
                    members={[
                      { name: "Alex", image: "https://github.com/shadcn.png" },
                      { name: "Beth", image: "https://github.com/shadcn.png" },
                      { name: "Chris", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Design", "Frontend"]}
                  />
                  <ProjectCard
                    title="Mobile App Development"
                    description="Create a new mobile app for iOS and Android"
                    progress={45}
                    dueDate="Nov 15"
                    members={[
                      { name: "Dana", image: "https://github.com/shadcn.png" },
                      { name: "Eric", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Mobile", "Development"]}
                  />
                  <ProjectCard
                    title="Marketing Campaign"
                    description="Q4 marketing campaign for product launch"
                    progress={20}
                    dueDate="Dec 1"
                    members={[
                      { name: "Fiona", image: "https://github.com/shadcn.png" },
                      { name: "Greg", image: "https://github.com/shadcn.png" },
                      { name: "Helen", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Marketing", "Content"]}
                  />
                  <ProjectCard
                    title="API Integration"
                    description="Integrate payment gateway API"
                    progress={90}
                    dueDate="Oct 10"
                    members={[
                      { name: "Ian", image: "https://github.com/shadcn.png" },
                      { name: "Julia", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Backend", "API"]}
                  />
                  <ProjectCard
                    title="User Research"
                    description="Conduct user interviews and surveys"
                    progress={60}
                    dueDate="Oct 22"
                    members={[
                      { name: "Kevin", image: "https://github.com/shadcn.png" },
                      { name: "Laura", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Research", "UX"]}
                  />
                  <ProjectCard
                    title="Data Analysis"
                    description="Analyze Q3 sales data and create reports"
                    progress={30}
                    dueDate="Nov 5"
                    members={[
                      { name: "Mike", image: "https://github.com/shadcn.png" },
                      { name: "Nina", image: "https://github.com/shadcn.png" },
                    ]}
                    tags={["Analytics", "Reports"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="team">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <TeamMemberCard
                    name="Alex Johnson"
                    role="Product Designer"
                    image="https://github.com/shadcn.png"
                    email="alex@example.com"
                    status="online"
                    projects={4}
                  />
                  <TeamMemberCard
                    name="Beth Smith"
                    role="Frontend Developer"
                    image="https://github.com/shadcn.png"
                    email="beth@example.com"
                    status="online"
                    projects={3}
                  />
                  <TeamMemberCard
                    name="Chris Davis"
                    role="UX Researcher"
                    image="https://github.com/shadcn.png"
                    email="chris@example.com"
                    status="offline"
                    projects={2}
                  />
                  <TeamMemberCard
                    name="Dana Wilson"
                    role="Backend Developer"
                    image="https://github.com/shadcn.png"
                    email="dana@example.com"
                    status="online"
                    projects={5}
                  />
                  <TeamMemberCard
                    name="Eric Brown"
                    role="Project Manager"
                    image="https://github.com/shadcn.png"
                    email="eric@example.com"
                    status="offline"
                    projects={8}
                  />
                  <TeamMemberCard
                    name="Fiona Lee"
                    role="Marketing Specialist"
                    image="https://github.com/shadcn.png"
                    email="fiona@example.com"
                    status="online"
                    projects={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your team's activity over the last 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityFeed
                      activities={[
                        {
                          user: {
                            name: "Alex Johnson",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "commented on",
                          target: "Website Redesign",
                          time: "5 minutes ago",
                        },
                        {
                          user: {
                            name: "Beth Smith",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "completed task",
                          target: "Create homepage mockup",
                          time: "2 hours ago",
                        },
                        {
                          user: {
                            name: "Chris Davis",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "uploaded",
                          target: "User research findings.pdf",
                          time: "Yesterday at 4:30 PM",
                        },
                        {
                          user: {
                            name: "Dana Wilson",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "created project",
                          target: "API Integration",
                          time: "Yesterday at 2:15 PM",
                        },
                        {
                          user: {
                            name: "Eric Brown",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "assigned",
                          target: "Mobile App Development to Dana",
                          time: "2 days ago",
                        },
                        {
                          user: {
                            name: "Fiona Lee",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "scheduled meeting",
                          target: "Q4 Marketing Planning",
                          time: "2 days ago",
                        },
                        {
                          user: {
                            name: "Greg Taylor",
                            image: "https://github.com/shadcn.png",
                          },
                          action: "joined team",
                          target: "Marketing Campaign",
                          time: "3 days ago",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, active = false }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, trend, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div
            className={`flex items-center text-sm font-medium ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
            {change}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

// Project Card Component
const ProjectCard = ({
  title,
  description,
  progress,
  dueDate,
  members,
  tags,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={18} />
          </Button>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {members.map((member, i) => (
                <Avatar key={i} className="border-2 border-background w-8 h-8">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Due {dueDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, role, image, email, status, projects }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                status === "online" ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>

          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-muted-foreground text-sm mb-1">{role}</p>
          <p className="text-sm text-muted-foreground mb-4">{email}</p>

          <div className="flex justify-between w-full text-sm">
            <div className="text-center">
              <p className="font-medium">{projects}</p>
              <p className="text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="font-medium">12</p>
              <p className="text-muted-foreground">Tasks</p>
            </div>
            <div className="text-center">
              <p className="font-medium">86%</p>
              <p className="text-muted-foreground">Completion</p>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Activity Feed Component
const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-6">
      {activities.map((activity, i) => (
        <div key={i} className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;

