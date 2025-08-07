import { useState } from "react";
import { Link } from "react-router-dom";
import { Id, Task } from "../types/types";
import Button from "./Button";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  handleAddTask: (columnId: Id, formData: {
    title: string;
    description: string;
    dueDate: string;
    status: string;
  }) => void
  handleDeleteTask: (id: Id) => void;
  handleEditTask: (taskId: Id, updatedTitle: string) => void;
  handleTaskDescription: (id: Id) => void;
}
/**
 * component that represents a single task card in a Kanban board.
 * It includes features like task title editing, deletion, and navigation to task details.
 * @param task - The task object containing task details.
 * @param handleDeleteTask - A function to handle task deletion.
 * @param handleEditTask - A function to handle task title editing.
 * @param handleTaskDescription - A function to handle navigation to task details.
 */
const TaskCard: React.FC<Props> =
  ({ task, handleDeleteTask, handleEditTask, handleTaskDescription }: Props) => {

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    function toggleEditMode() {
      setEditMode(true)
      setMouseIsOver(false);
    }
    //hndle when i press enter in edit task 
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
      }
    };

    // useSortable hook is used to make the column sortable
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
      id: task.id,
      data: { type: 'Task', task },
      // disabled: editMode, // Disable dragging when in edit mode
    });

    // The styles for the sortable column are defined here
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
      return <div ref={setNodeRef} style={style} className="mainBackgroundColor
       p-4 h-[120px]
       min-h[120px] 
      items-center 
      text-left 
      rounded-lg 
      hover:ring-1 
      hover:ring-amber-500 
      hover:ring-inset relative
      shadow-md 
      hover:shadow-lg 
      transition-shadow 
      duration-500 cursor-pointer 
      opacity-50 
      border-amber-500 
      border-1"></div>
    }

    return (
      <>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={toggleEditMode} onMouseEnter={() => setMouseIsOver(true)} onMouseLeave={() => setMouseIsOver(false)} className="mainBackgroundColor 
        p-4 h-[120px] 
        min-h[120px] 
        items-center 
        text-left 
        rounded-lg      
        hover:ring-1 
        hover:ring-amber-500 
        hover:ring-inset relative
        shadow-md hover:shadow-lg 
        transition-shadow duration-500 cursor-pointer">
          {mouseIsOver && <Button className="p-2 text-rose-600 text-right absolute right-4 top-1/4 opacity-60 hover:opacity-100" onClick={() => { handleDeleteTask(task.id) }} ><TrashIcon /></Button>}

          {!editMode && <h3 className="text-lg font-semibold m-1">{task.title}</h3>}
          {editMode && <input type="text" autoFocus className="text-lg font-semibold"
            value={task.title}
            onChange={(e) => handleEditTask(task.id, e.target.value !== '' ? e.target.value : 'Untitled Title')}
            onKeyDown={(e) => handleKeyDown(e)} />}

          <p><Link to={`/task/${task.id}`} state={{ task }} className="text-gray-500  hover:text-amber-500 opacity-70 cursor-pointer 
            hover:transition delay-150 duration-300 ease-in-out
            hover:-translate-y-1 hover:scale-100 " onClick={() => { handleTaskDescription(task.id) }}>Task description here.</Link></p>
          <div className="mt-2 flex justify-between">
            <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
            <span className="text-sm text-gray-600"><span className="text-amber-500 opacity-80">Status:  </span>{task.status}</span>
          </div>
        </div>
      </>
    )
  }

export default TaskCard