import { Home, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SheetContent,
} from "../ui/sheet";

const navItems = [
  { text: "Home", icon: Home, path: "/" },
  { text: "About", icon: Info, path: "/about" },
];

interface NavDrawerProps {
  variant: "temporary" | "permanent";
  className?: string;
  onNavigate?: () => void;
}

export const NavDrawer = ({
  variant,
  className,
  onNavigate,
}: NavDrawerProps) => {
  const location = useLocation();

  const drawerContent = (
    <nav className="w-[250px] p-4">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li key={item.text}>
              <Link
                to={item.path}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (variant === "temporary") {
    return (
      <SheetContent side="left" className={className}>
        {drawerContent}
      </SheetContent>
    );
  }

  // Permanent drawer
  return (
    <aside className={`hidden md:block ${className || ""}`}>
      {drawerContent}
    </aside>
  );
};
