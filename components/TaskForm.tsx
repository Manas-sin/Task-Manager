"use client";
import React, { useState, useCallback } from "react";
import { useTasks } from "@/context/TaskContext";
import { FaPlus } from "react-icons/fa";


const TaskForm = React.memo(() => {
  const { addTask } = useTasks();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("Task cannot be empty");
      return;
    }
    addTask(value.trim());
    setValue("");
    setError("");
  }, [value, addTask]);

  return (
    <form className="tm-form" onSubmit={handleSubmit}>
      <input
        className="tm-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter new task..."
      />
<button className="tm-add-btn" type="submit" aria-label="Add Task">
  <FaPlus size={18} />
</button>
    {error && <p className="tm-error">{error}</p>}
    </form>
  );
});

export default TaskForm;
