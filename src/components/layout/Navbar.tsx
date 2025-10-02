import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link } from "react-router-dom";

import { role } from "@/constant/role";

import { useAppDispatch } from "@/redux/hook";

import { LogIn, LogOut } from "lucide-react";
import { ModeToggle } from "./moodToggler";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/api/authApi";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },

  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/user/userHome", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data;
  console.log("user data", data);
  console.log("user navbar", user);
  if (isLoading) {
    console.log("Loading user info...");
  }
  if (error) {
    console.error("Failed to fetch user info", error);
  }
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(undefined);
      // Clear all Redux state
      dispatch(authApi.util.resetApiState());
      // Clear localStorage to remove persisted state
      localStorage.clear();
      // Force redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Force redirect to login page even if logout API fails
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <header className="border-b">
      <div className=" max-w-7xl mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <Link to={"/"} className="text-primary hover:text-primary/90">
          <img
            className=" w-72"
            src="https://i.ibb.co/g5VqtLk/Transactly-Financial-Services-Logo.png"
            alt="logo"
          />
          <span className="sr-only font-bold text-xl text-foreground">
            Transactly
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden text-foreground hover:text-primary hover:bg-accent"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-36 p-1 md:hidden bg-background border border-border"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2 text-foreground">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link
                          to={link.href}
                          className="text-foreground hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map(
                  (link, index) =>
                    (!link.role || link.role === user?.role) && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link
                            to={link.href}
                            className="text-foreground hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                )}
                {/* Help dropdown for desktop */}
                {/* <NavigationMenuItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <NavigationMenuLink className="text-muted-foreground hover:text-primary py-1.5 font-medium cursor-pointer">
                        Help
                      </NavigationMenuLink>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="grid gap-2">
                        {helpItems.map((item, index) => (
                          <Link
                            key={index}
                            to={`/help?section=${item.slug}`}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center hover:text-primary gap-2">
          <ModeToggle />
          {user?.email ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-foreground hover:text-primary hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2 text-foreground hover:text-primary hover:bg-accent"
            >
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
