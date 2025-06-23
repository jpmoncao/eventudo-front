"use client"

import {useTheme} from "next-themes"
import { Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"

const DEFAULT_LOCALE = "pt";
const languages = ["pt", "en"] as const;

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" className="pointer" aria-label="Toggle theme" onClick={() => toggleTheme()}>
      {theme === "dark" 
        ? <Sun />
        : <Moon />}
    </Button>
  )
}
