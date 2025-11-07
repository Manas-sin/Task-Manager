"use client";
import React from "react";
import { TaskProvider } from "../context/TaskContext";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "@/components/Taskslist";
import Filters from "@/components/FIlters";

export default function Page() {
  return (
    <TaskProvider>
      <div className="tm-container">
        <Header />
        <TaskForm />
        <Filters />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
