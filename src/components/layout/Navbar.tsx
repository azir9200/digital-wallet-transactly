import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { useUserInfoQuery } from "@/redux/api/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;
  console.log("navbar user", user);
  console.log("navbar ", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // const { token } = useSelector((state: RootState) => state.auth);
  // console.log("tok navbar", token);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "User", href: "/dashboard/user" },
    { name: "Agent", href: "/dashboard/agent" },
    { name: "Admin", href: "/dashboard/admin" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-50 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div></div>
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="https://i.ibb.co/g5VqtLk/Transactly-Financial-Services-Logo.png"
              alt="logo"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-smooth ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="link" size="sm">
                    Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-primary">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="link" size="sm">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/50 backdrop-blur-sm rounded-lg mt-2 border border-border/50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div>
                  <p>Logout</p>
                </div>
              ) : (
                <div>
                  {" "}
                  <p>login</p>{" "}
                </div>
              )}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Sign In in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="link" className="w-full">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
