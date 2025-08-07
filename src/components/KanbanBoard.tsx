import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Column, Id, Task } from "../types/types";
import PlusIcon from "../icons/PlusIcon";
import Tasks from "../icons/Tasks";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  createColumn,
  getColumnsFromLocalStorage,
  deleteColumn,
  updateColumnTitle,
} from "../utils/columnUtils";
import {
  getTasksFromLocalStorage,
  AddTask,
  deleteTask,
} from "../utils/taskUtils";
import Button from "./Button";
import TaskCard from "./TaskCard";
import ColumnContainer from "./ColumnContainer";

// Kanbanboard component that will render the Kanban board interface which uses React and Tailwind CSS
const Kanbanboard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Memoizing the columnsId to avoid unnecessary recalculations
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  useEffect(() => {
    const saved = getTasksFromLocalStorage();
    setTasks(saved);

    const savedColumns = getColumnsFromLocalStorage();
    setColumns(savedColumns);
  }, []);

  // Function to handle the creation of a new column
  function handelCreateColumn() {
    setColumns((prev) => createColumn(prev));
  }

  // Function to handle the add of a task.
  function handleAddTask(
    columnId: Id,
    formData: {
      title: string;
      description: string;
      dueDate: string;
      status: string;
    }
  ) {
    const newTask: Task = {
      id: Date.now(),
      columnId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      status: formData.status,
    };

    const updated = AddTask(newTask); // custom util
    setTasks(updated);
  }

  // Function to handle the deletion of a column.
  function handelDeleteColumn(id: Id) {
    setColumns((prev) => deleteColumn(prev, id));
  }
  // Function to handle the deletion of a task.
  function handleDeleteTask(taskId: Id) {
    const updated = deleteTask(taskId);
    setTasks(updated);
  }

  // Function to update the title of a column.
  function handleUpdateColumnTitle(id: Id, title: string) {
    setColumns((prev) => updateColumnTitle(prev, id, title));
  }
  // Function to update the title of a task.
  function handleEditTask(taskId: Id, newContent: string) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = savedTasks.map((task: Task) =>
      task.id === taskId
        ? { ...task, content: newContent, title: newContent }
        : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Function to handle the creation of a new task in a specific column.
  function onDragStart(event: DragStartEvent) {
    console.log("Drag started:", event);
    if (event.active.data.current?.type === "Column") {
      const column = event.active.data.current.column;
      setActiveColumn(column);
      return column;
    }
    if (event.active.data.current?.type === "Task") {
      const task = event.active.data.current.task;
      setActiveTask(task);
      return task;
    }
  }
  // Function to handle the end of a drag event.
  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    setActiveColumn(null);
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) {
      return;
    }
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      return;
    }
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return;

    // when drop a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (task) => task.id === activeColumnId
        );
        const overIndex = tasks.findIndex((task) => task.id === overColumnId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
    // when deop a task over column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (task) => task.id === activeColumnId
        );

        tasks[activeIndex].columnId = overColumnId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <>
      <div
        className="m-auto
            min-h-screen
            w-full
             flex 
             overflow-x-auto
             overflow-y-hidden
             items-center
             px-[40px] 
           "
      >
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          sensors={sensors}
          onDragOver={onDragOver}
        >
          {/*
                This section renders the Kanban board columns.
                It maps through the columns array and renders a ColumnContainer for each column.        
                */}
          {columns && (
            <div className="m-auto flex gap-4">
              <div className="flex gap-4">
                <SortableContext items={columnsId}>
                  {columns.map((column) => (
                    <ColumnContainer
                      key={column.id}
                      column={column}
                      handelDeleteColumn={handelDeleteColumn}
                      handleUpdateColumnTitle={handleUpdateColumnTitle}
                      handleAddTask={handleAddTask}
                      tasks={tasks.filter(
                        (task) => task.columnId && task.columnId === column.id
                      )}
                      handleDeleteTask={handleDeleteTask}
                      handleEditTask={handleEditTask}
                      handleTaskDescription={() => console.log(column.id)}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          )}
          {/* If there are no columns, display a message */}
          {!columns.length && (
            <div
              className="h-[100px]
                     w-[500px]
                      min-w-[300px] 
                     text-center
                     text-2xl
                      rounded-lg 
                      borderColor 
                      p-4
                      noTasks
                      ring-amber-500
                      bg-stone-900"
            >
              <Tasks />
              <h2>No columns available !</h2>
            </div>
          )}

          {/* Button to add a new column */}
          {/* When clicked, it calls the handelCreateColumn function to add a new column */}
          <div className="m-auto">
            <Button
              className="h-[60px]
                     w-[250px]
                      min-w-[250px] 
                      border-2
                      rounded-lg 
                      borderColor 
                      p-4
                      ring-amber-500
                      hover:ring-2 
                      mainBackgroundColor"
              onClick={handelCreateColumn}
            >
              <PlusIcon />
              Add Column
            </Button>

            {/*
                        This section renders the DragOverlay component.
                        It displays the currently active column being dragged.
                        If there is an active column, it renders a ColumnContainer for that column.
                        */}
            {createPortal(
              <DragOverlay>
                {activeColumn ? (
                  <ColumnContainer
                    column={activeColumn}
                    handelDeleteColumn={handelDeleteColumn}
                    handleUpdateColumnTitle={handleUpdateColumnTitle}
                    handleAddTask={handleAddTask}
                    tasks={tasks.filter(
                      (task) => task.columnId === activeColumn.id
                    )}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    handleTaskDescription={() =>
                      console.log("Task description clicked", activeColumn.id)
                    }
                  />
                ) : null}

                {activeTask ? (
                  <TaskCard
                    task={activeTask}
                    handleAddTask={handleAddTask}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    handleTaskDescription={() =>
                      console.log("Task description clicked", activeTask.id)
                    }
                  />
                ) : null}
              </DragOverlay>,
              document.body
            )}
          </div>
        </DndContext>
      </div>
    </>
  );
};

export default Kanbanboard;
