"use client";
import React from "react";
import { useTasks } from "../context/TaskContext";

const Filters: React.FC = React.memo(() => {
  const { filter, setFilter, tasks } = useTasks();

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="tm-filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All ({tasks.length})
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending ({pendingCount})
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
});

export default Filters;
