"use client";
import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface TaskContextProps {
  tasks: { id: string; title: string; completed: boolean }[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorder: (start: number, end: number) => void;
  filter: "all" | "pending" | "completed";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "pending" | "completed">>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const TaskContext = createContext<TaskContextProps | null>(null);

export const useTasks = (): TaskContextProps => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<{ id: string; title: string; completed: boolean }[]>("tm_tasks", []);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("tm_theme", "light");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all"); // useState is used to store the filter state in the component


  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addTask = useCallback((title: string) => {
    setTasks(prev => [{ id: uuidv4(), title, completed: false }, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const reorder = useCallback((start: number, end: number) => {
    setTasks(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(start, 1);
      updated.splice(end, 0, moved);
      return updated;
    });
  }, [setTasks]);

  const value = useMemo(() => ({
    tasks, addTask, toggleTask, deleteTask, reorder, filter, setFilter, theme, setTheme
  }), [tasks, filter, theme]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
