
import React from 'react';
import { 
  BarChart, 
  PieChart, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-100 shadow-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-semibold text-lg text-hr-charcoal animate-fade-in">
            HR Dashboard
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-gray-500 hover:text-hr-blue hover:bg-hr-gray transition-colors duration-200"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex flex-col items-center py-4">
        <Avatar className={cn("h-10 w-10 transition-all duration-300", collapsed ? "mb-2" : "mb-3")}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="text-center animate-fade-in">
            <div className="font-medium text-sm">John Doe</div>
            <div className="text-xs text-gray-500">HR Manager</div>
          </div>
        )}
      </div>
      
      <Separator className="my-2" />
      
      <div className="flex-1 overflow-y-auto hr-custom-scrollbar px-2 py-4 stagger-fade-in">
        <NavItem icon={BarChart} label="Analytics" active collapsed={collapsed} />
        <NavItem icon={PieChart} label="Reports" collapsed={collapsed} />
        <NavItem icon={Users} label="Employees" collapsed={collapsed} />
        <NavItem icon={FileText} label="Documents" collapsed={collapsed} />
        <NavItem icon={Settings} label="Settings" collapsed={collapsed} />
      </div>
      
      <div className="p-4">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start gap-2 text-gray-500 hover:text-hr-blue hover:bg-hr-gray transition-colors duration-200",
            collapsed && "justify-center p-2"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Log Out</span>}
        </Button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.FC<{ size?: number }>;
  label: string;
  active?: boolean;
  collapsed: boolean;
}

function NavItem({ icon: Icon, label, active, collapsed }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 my-1 transition-all duration-200",
        collapsed ? "justify-center p-2" : "px-3 py-2",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-gray-500 hover:text-hr-blue hover:bg-hr-gray"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
}
