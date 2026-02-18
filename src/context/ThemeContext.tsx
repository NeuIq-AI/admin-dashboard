import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  dark: boolean;
}


export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => { },
  dark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    console.log("Dark state:", dark);

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    console.log("HTML classes:", document.documentElement.classList);

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, dark }}>
      {children}
    </ThemeContext.Provider>
  );
};
