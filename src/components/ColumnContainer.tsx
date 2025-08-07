import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types/types"
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "./Button"
import TaskCard from "./TaskCard";
import Modal from './Modal';
import TrashIcon from "../icons/TrashIcon"
import AddTask from "../icons/AddTask";
import Edit from "../icons/Edit";

interface Props {
    column: Column
    tasks: Task[]
    handleUpdateColumnTitle: (id: Id, title: string) => void;
    handelDeleteColumn: (id: Id) => void;
    handleDeleteTask: (id: Id) => void;
    handleEditTask: (taskId: Id, updatedTitle: string) => void;
    handleTaskDescription: (id: Id) => void;
    handleAddTask: (columnId: Id, formData: {
        title: string;
        description: string;
        dueDate: string;
        status: string;
    }) => void

}
/*ColumnContainer component that will render each column in the Kanban board
It displays the column title, a delete button, and a container for tasks*/
const ColumnContainer: React.FC<Props> = ({ column, handelDeleteColumn, handleUpdateColumnTitle, handleAddTask, tasks, handleDeleteTask, handleEditTask, handleTaskDescription }: Props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "In Progress",
    });

    // Memoizing the TasksIds to avoid unnecessary recalculations        
    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks]);

    function handelEditColumnName() {
        setEditMode(true);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setEditMode(false);
        }
    };
    // useSortable hook is used to make the column sortable
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: { type: 'Column', column },
        // disabled: editMode, // Disable dragging when in edit mode
    });

    // The styles for the sortable column are defined here
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if (isDragging) {
        return <div ref={setNodeRef} style={style} className="columnBackgroundColor 
       w-[350px]
       h-[500px] 
       max-h-[500px] 
       rounded-md 
       opacity-40
       border-2
       border-amber-500
       flex 
       flex-col "></div>
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newTask.title.trim()) return;
                    handleAddTask(column.id, newTask);
                    setNewTask({ title: "", description: "", dueDate: "", status: "In Progress" });
                    setShowForm(false);
                    setIsModalOpen(false);
                }} className="space-y-2">

                    <input
                        type="text"
                        placeholder="Task title"
                        value={newTask.title}
                        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full p-2 rounded border"
                    />
                    <textarea
                        placeholder="Description"
                        value={newTask.description}
                        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full p-2 rounded border"
                    />
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full p-2 rounded border"
                    />
                    <select
                        value={newTask.status}
                        onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                        className="w-full p-2 rounded border columnBackgroundColor"
                    >
                        <option>In Progress</option>
                        <option>To Do</option>
                        <option>Done</option>
                    </select>

                    <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded w-full">
                        Add Task
                    </button>
                </form>

            </Modal>

            <div onClick={handelEditColumnName} {...attributes} {...listeners} ref={setNodeRef} style={style} className="columnBackgroundColor 
            cursor-grab
            w-[350px] 
            h-[600px]
            max-h-[700px] 
            rounded-md 
            flex 
            flex-col">

                {/* display the column title */}
                <div className="mainBackgroundColor 
                text-md
                h-[60px]
                cursor-grab
                rounded-md
                rounded-b-none
                p-3
                font-bold
                borderColor
                border-4
                flex
                items-center
                justify-between
                                ">
                    <div className="flex gap-2">
                        <div className="flex 
                        justify-center
                        items-center 
                        px-2 
                        py-1
                        text-sm
                        rounded-md
                        columnBackgroundColor ">
                            <Edit />
                        </div>

                        {!editMode && column.title}
                        {editMode && <input type="text"

                            value={column.title}
                            onChange={(e) => handleUpdateColumnTitle(column.id, e.target.value !== '' ? e.target.value : 'Untitled Column')}
                            onKeyDown={(e) => handleKeyDown(e)} />
                        }
                    </div>
                    {/* Button to delete the column When clicked, it calls the handelDeleteColumn functi with the column's id*/}
                    <Button className=" text-rose-600" onClick={() => handelDeleteColumn(column.id)}><TrashIcon /></Button>
                </div>

                {/*  column task container */}
                <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
                    <SortableContext items={tasksIds}>
                        {tasks.map(task =>
                            <TaskCard key={task.id} task={task} handleDeleteTask={handleDeleteTask} handleAddTask={handleAddTask} handleTaskDescription={handleTaskDescription} handleEditTask={handleEditTask} />
                        )
                        }
                    </SortableContext>
                </div>
                {/*  column footer  */}
                <Button className='h-[60px]
                     w-[350px]
                      min-w-[300px] 
                      border-2
                      rounded-lg 
                      borderColor 
                      p-4
                      ring-amber-500
                      hover:ring-2 
                      mainBackgroundColor'
                    onClick={() => setIsModalOpen(true)}>
                    <AddTask />
                    {showForm ? "Cancel" : "Add Task"}
                </Button>

            </div>
        </>
    )

}

export default ColumnContainer