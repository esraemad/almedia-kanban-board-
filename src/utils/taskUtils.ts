import { Id, Task } from "../types/types";

// dynamic name 
const TASKS_KEY = "tasks";

/**
 * Get tasks from local storage.
 */
export function getTasksFromLocalStorage(): Task[] {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Saves an array of tasks to local storage.
 */
export function saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Adds a new task to the existing list of tasks in local storage.
 */
export function AddTask(newTask: Task): Task[] {
    const tasks = getTasksFromLocalStorage();
    const updated = [...tasks, newTask];
    saveTasksToLocalStorage(updated);
    return updated;
}

/**
 * Deletes a task from the list of tasks stored in local storage.
 */
export function deleteTask(taskId: Id): Task[] {
    const tasks = getTasksFromLocalStorage();
    const updated = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updated);
    return updated;
}


/**
 * Edits an existing task in the task list stored in local storage.
 */
export function editTask(updatedTask: Task): Task[] {
    const tasks = getTasksFromLocalStorage();
    const updated = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    saveTasksToLocalStorage(updated);
    return updated;
}