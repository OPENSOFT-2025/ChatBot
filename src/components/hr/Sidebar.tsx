
import React from 'react';
import { 
  BarChart, 
  FileText, 
  LogOut, 
  User,
  Menu,
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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-hr-black border-r border-hr-green/30 shadow-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-semibold text-lg text-hr-green animate-fade-in">
            HR Dashboard
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-hr-green hover:text-white hover:bg-hr-green/20 transition-colors duration-200"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <Separator className="my-2 bg-hr-green/20" />
      
      <div className="flex-1 overflow-y-auto hr-custom-scrollbar px-2 py-4 stagger-fade-in">
        <NavItem 
          icon={BarChart} 
          label="Analytics" 
          active 
          collapsed={collapsed} 
          onClick={() => scrollToSection('analytics-section')}
        />
        <NavItem 
          icon={FileText} 
          label="Reports" 
          collapsed={collapsed} 
          onClick={() => scrollToSection('reports-section')}
        />
      </div>
      
      <Separator className="my-2 bg-hr-green/20" />
      
      <div className="p-4">
        <div className={cn(
          "flex flex-col items-center rounded-lg bg-hr-green/10 p-4 transition-all duration-300",
          collapsed ? "py-2" : "py-4"
        )}>
          <Avatar className={cn("h-16 w-16 border-2 border-hr-green shadow-lg mb-4", collapsed && "h-10 w-10 mb-2")}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-hr-green text-black font-semibold">JD</AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="text-center space-y-1 animate-fade-in">
              <div className="font-semibold text-white">John Doe</div>
              <div className="text-xs text-hr-green font-medium">HR Manager</div>
              <div className="text-xs text-gray-400">ID: HR-2024-001</div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className={cn(
              "w-full mt-4 justify-center gap-2 text-hr-green hover:bg-hr-green hover:text-black transition-colors duration-200",
              collapsed && "p-2"
            )}
          >
            <LogOut size={16} />
            {!collapsed && <span>Log Out</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, active, collapsed, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 my-3 transition-all duration-200",
        collapsed ? "justify-center p-2" : "px-3 py-2",
        active 
          ? "bg-hr-green text-black" 
          : "text-white hover:bg-hr-green/70 hover:text-black"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
}
