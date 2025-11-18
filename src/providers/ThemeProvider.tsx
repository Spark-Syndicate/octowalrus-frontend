import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Context for theme mode
const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light" as "light" | "dark",
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Sample toggle button component
export const ThemeToggleButton: React.FC = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <button
      onClick={toggleColorMode}
      className="ml-1 rounded p-2 hover:bg-accent"
      aria-label="toggle dark mode"
    >
      {mode === "dark" ? "☀️" : "🌙"}
    </button>
  );
};
