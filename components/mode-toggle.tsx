"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Laptop } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" className="w-10 px-0" size="sm">
        <span className="block animate-pulse h-4 w-4 bg-current rounded-full"></span>
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />;
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />;
      default:
        return <Laptop className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "dark":
        return "Dark";
      case "light":
        return "Light";
      default:
        return "System";
    }
  };

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <Button variant="ghost" className="w-10 px-2" size="sm" onClick={cycleTheme}>
      <div className="flex items-center justify-center">
        {getThemeIcon()}
      </div>
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
