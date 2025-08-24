import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  Menu, 
  X, 
  Home, 
  CreditCard, 
  ArrowUpDown, 
  History, 
  User, 
  LogOut,
  Users,
  BarChart3,
  Settings,
  UserCheck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
// import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Profile', href: '/dashboard/profile', icon: User },
    ];

    switch (user?.role) {
      case 'user':
        return [
          ...baseItems.slice(0, 1),
          { name: 'Transactions', href: '/dashboard/transactions', icon: History },
          { name: 'Send Money', href: '/dashboard/send', icon: ArrowUpDown },
          { name: 'Deposit', href: '/dashboard/deposit', icon: CreditCard },
          baseItems[1], // Profile
        ];
      case 'agent':
        return [
          ...baseItems.slice(0, 1),
          { name: 'Cash In/Out', href: '/dashboard/cash-operations', icon: CreditCard },
          { name: 'Transactions', href: '/dashboard/transactions', icon: History },
          { name: 'Commission', href: '/dashboard/commission', icon: BarChart3 },
          baseItems[1], // Profile
        ];
      case 'admin':
        return [
          ...baseItems.slice(0, 1),
          { name: 'Users', href: '/dashboard/users', icon: Users },
          { name: 'Agents', href: '/dashboard/agents', icon: UserCheck },
          { name: 'Transactions', href: '/dashboard/transactions', icon: History },
          { name: 'Settings', href: '/dashboard/settings', icon: Settings },
          baseItems[1], // Profile
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'agent':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'text-red-500';
      case 'agent':
        return 'text-blue-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                RemitSwift
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.href) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                      }
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-primary text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <div className={`flex items-center space-x-1 text-xs ${getRoleColor()}`}>
                  {getRoleIcon()}
                  <span className="capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                RemitSwift
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;