import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition relative"
    >
      <div className="absolute left-1 dark:left-6 transition-all duration-300">
        <div className="bg-white dark:bg-gray-900 w-4 h-4 rounded-full shadow flex items-center justify-center">
          <Sun className="w-3 h-3 text-yellow-500 dark:hidden" />
          <Moon className="w-3 h-3 text-indigo-400 hidden dark:block" />
        </div>
      </div>
    </button>
  );
}
