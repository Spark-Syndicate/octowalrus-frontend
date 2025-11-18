import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NavDrawer } from "./NavDrawer";

export const Nav = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    // On mobile, the NavDrawer is controlled by the Header's menu button
    return null;
  }

  return (
    <NavDrawer
      variant="permanent"
      className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-[250px] border-r bg-background"
    />
  );
};
