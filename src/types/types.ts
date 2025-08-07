
export type Id = string | number;

//Column Type
export type Column = {
    id: Id;
    title: string;
}
//Task Type 
export type Task = {
    id: Id;
    columnId: Id;
    title: string;
    description?: string;
    dueDate?: string;
    status?: string;
}