"use client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import { FaTrash } from "react-icons/fa";

interface Props {
  task: { id: string; title: string; completed: boolean };
  index: number;
}

const TaskItem: React.FC<Props> = React.memo(({ task, index }) => {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          id={task.id}
          ref={provided.innerRef}             
          {...provided.draggableProps}           
          {...provided.dragHandleProps}           
          className={`tm-task ${snapshot.isDragging ? "dragging" : ""}`}
        >
          <label className="tm-task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>{task.title}</span>
          </label>
          <button className="tm-delete-btn" onClick={() => deleteTask(task.id)}>
            <FaTrash size={14} />
          </button>
        </li>
      )}
    </Draggable>
  );
});

export default TaskItem;
