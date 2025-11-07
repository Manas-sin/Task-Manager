"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Header: React.FC = React.memo(() => {
  const { theme, setTheme } = useTasks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  return (
    <header className="tm-header">
      <h1>Advanced Task Manager</h1>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="tm-btn tm-theme-btn"
      >
        {mounted ? (
          theme === "light" ? (
            <FaMoon className="theme-icon rotate-in" size={20} />
          ) : (
            <FaSun className="theme-icon rotate-in" size={20} />
          )
        ) : (
          <div style={{ width: 20, height: 20 }} />
        )}
      </button>
    </header>
  );
});

export default Header;
