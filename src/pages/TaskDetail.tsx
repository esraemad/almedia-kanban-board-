import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Task } from "../types/types";
import Button from "../components/Button";
import BackHome from "../icons/BackHome";

/**
 * The TaskDetail component is responsible for displaying the details of a specific task,
 * including its title, description, due date, status, and comments.
 * It allows users to add comments to the task and view existing comments.
 *
 * @param taskId - The unique identifier of the task to be displayed.
 * @param navigateToHome - A function to navigate to the home page.
 * @param state - The location state containing the task object.
 * @param task - The task object containing details such as title, description, due date, and status.
 * @param commentInput - The current value of the comment input field.
 * @param setCommentInput - A function to update the comment input field value.
 * @param comments - An array of comments associated with the task.
 * @param setComments - A function to update the comments array.
 * @param commentStorageKey - The key used to store comments in the local storage.
 */
function TaskDetail() {
    const { taskId } = useParams();
    const navigateToHome = useNavigate();
    const { state } = useLocation();
    const task: Task = state?.task;

    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState<string[]>([]);

    const commentStorageKey = `comments-task-${taskId}`;

    useEffect(() => {
        const savedComments = localStorage.getItem(commentStorageKey);
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        }
    }, [commentStorageKey]);

    //hanlde add comment to task 

    function handleAddComment(e: React.FormEvent) {
        e.preventDefault();
        if (!commentInput.trim()) return;

        const updatedComments = [...comments, commentInput];
        setComments(updatedComments);
        localStorage.setItem(commentStorageKey, JSON.stringify(updatedComments));
        setCommentInput("");
    }

    return (
        <>
            <div className="relative m-20 ">
                <Button
                    className="h-14 w-full max-w-xs border-2 rounded-lg borderColor p-4 ring-amber-500 hover:ring-2 mainBackgroundColor absolute bottom-6 right-4 sm:static sm:mb-4 sm:mx-auto sm:block"
                    onClick={() => navigateToHome("/")}
                >
                    <BackHome /> Back to Kanban Board

                </Button>
            </div>

            <div className="mainBackgroundColor p-4 m-4 rounded-lg hover:ring-1 hover:ring-amber-500 hover:ring-inset shadow-md hover:shadow-lg transition-shadow duration-500 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold">{task?.title}</h2>
                <p>{task?.description}</p>

                <div className="mt-2 flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-2">
                    <span>Due: {task?.dueDate}</span>
                    <span>Status: {task?.status}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6 mainBackgroundColor p-4 rounded-lg shadow-md max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-2 text-amber-500">Comments</h3>
                <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-grow p-2 rounded border border-gray-300 text-amber-50"
                    />
                    <button
                        type="submit"
                        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
                    >
                        Add
                    </button>
                </form>

                <ul className="space-y-2">
                    {comments.length === 0 ? (
                        <p className="text-gray-400">No comments yet.</p>
                    ) : (
                        comments.map((c, idx) => (
                            <li
                                key={idx}
                                className="p-2 border border-gray-600 rounded  text-white break-words"
                            >
                                {c}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}

export default TaskDetail;
