import { Menu } from "lucide-react";
import { useState } from "react";
import { NavDrawer } from "../Nav/NavDrawer";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              aria-label="menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <NavDrawer variant="temporary" onNavigate={() => setIsOpen(false)} />
        </Sheet>
        <h1 className="flex-1 text-lg font-semibold">octowalrus-frontend</h1>
        <div className="hidden md:flex">
          {/* Additional header actions can be added here */}
        </div>
      </div>
    </header>
  );
};
