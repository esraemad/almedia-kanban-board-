import { Column, Id } from "../types/types";

/**
 * Get columns from local storage.
 * This function fetch the "columns" item from localStorage.
 * If the item exists, it parses the JSON string into an array of Column objects.
 * If the item doesn't exist , it returns an empty array.
 */
export function getColumnsFromLocalStorage(): Column[] {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : [];
}

/**
 * Saves columns to local storage.
 * This function takes an array of Column objects, converts it to a JSON string,
 * and stores it in the browser's local storage under the key "columns".
 */
function saveColumnsToLocalStorage(columns: Column[]) {
    localStorage.setItem("columns", JSON.stringify(columns));
}

/**
 * Creates a new column and adds it to the existing columns array.
 * This function generates a new column with a unique ID (using timestamp) and
 * a dynamic title based on the number of existing columns. It then adds this
 * new column to the provided array and saves the updated array to local storage.
 */
export function createColumn(columns: Column[]): Column[] {
    const columnToAdd: Column = {
        id: Date.now(), /// Using timestamp as a unique ID
        title: `Column ${columns.length + 1}`, //Dynamic title based on the number of existing columns
    };
    const updatedColumns = [...columns, columnToAdd];
    saveColumnsToLocalStorage(updatedColumns);
    return updatedColumns;
}

/**
 * It filters out the column with the given ID.  
 * Deletes a column from the given array of columns based on the provided ID.
 */
export function deleteColumn(columns: Column[], id: Id): Column[] {
    const updatedColumns = columns.filter(column => column.id !== id);
    saveColumnsToLocalStorage(updatedColumns);
    return updatedColumns;
}

/**
 * Updates the title of a specific column in the given array of columns.
 */
export function updateColumnTitle(columns: Column[], id: Id, title: string): Column[] {
    const updatedColumns = columns.map(column =>
        column.id === id ? { ...column, title } : column
    );
    saveColumnsToLocalStorage(updatedColumns);
    return updatedColumns;
}