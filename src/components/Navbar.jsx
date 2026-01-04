import { Link, useLocation } from "react-router-dom";
import { Trophy, Calendar, Users } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Leaderboard", icon: Trophy },
    { path: "/weekly", label: "Weekly Results", icon: Calendar },
    { path: "/players", label: "Players", icon: Users },
  ];

  return (
    <nav className="gradient-hero sticky top-0 z-50 shadow-elevated">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl font-bold text-primary-foreground tracking-wide uppercase">
                Elite Sports
              </span>
              <span className="text-xs text-primary-foreground/70 tracking-widest uppercase hidden sm:block">
                Academy
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;