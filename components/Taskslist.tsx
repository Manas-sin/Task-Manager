"use client";
import React, { useCallback, useMemo } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList: React.FC = React.memo(() => {
  const { tasks, reorder, filter } = useTasks();

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    reorder(result.source.index, result.destination.index);
  }, [reorder]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks-droppable">
        {(provided) => (
          <ul
            className="tm-list"
            ref={provided.innerRef}               
            {...provided.droppableProps}      
          >
            {filteredTasks.map((task, index) => (
              <TaskItem key={task.id || task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default TaskList;
