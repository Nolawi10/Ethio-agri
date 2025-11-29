import { Home, Camera, BookOpen, ShoppingBag, History, Cloud } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, labelAm: "መነሻ", labelEn: "Home" },
    { to: "/diagnose", icon: Camera, labelAm: "ምርመራ", labelEn: "Diagnose" },
    { to: "/guides", icon: BookOpen, labelAm: "መመሪያ", labelEn: "Guides" },
    { to: "/market", icon: ShoppingBag, labelAm: "ገበያ", labelEn: "Market" },
    { to: "/weather", icon: Cloud, labelAm: "የአየር ሁኔታ", labelEn: "Weather" },
    { to: "/history", icon: History, labelAm: "ታሪክ", labelEn: "History" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Ethio Agri" className="w-10 h-10" />
              <span className="text-xl font-bold ethiopic">Ethio Agri</span>
            </div>
            
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-muted"
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ethiopic font-medium">{item.labelAm}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-medium">
        <div className="flex items-center justify-around h-20 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px]"
              activeClassName="text-primary"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs ethiopic font-medium">{item.labelAm}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
