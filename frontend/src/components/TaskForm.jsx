import { useState } from "react";

function TaskForm({ onClose, onTaskCreated, onTaskUpdated, taskToEdit }) {

    const [formData, setFormData] = useState({
        title: taskToEdit?.title || "",
        description: taskToEdit?.description || "",
        category: taskToEdit?.category || "Assignment",
        priority: taskToEdit?.priority || "Medium",
        dueDate: taskToEdit?.dueDate
            ? taskToEdit.dueDate.split("T")[0]
            : ""
    });

    const [error, setError] = useState("");


    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    }


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!formData.title.trim()) {
            setError("Task title is required.");
            return;
        }

        if (!formData.dueDate) {
            setError("Due date is required.");
            return;
        }

        try {
            if (taskToEdit) {
                const updatedTask = await onTaskUpdated(
                    taskToEdit._id,
                    formData
                );

                if (updatedTask) {
                    onClose();
                }
            } else {
                const newTask = await onTaskCreated(formData);

                if (newTask) {
                    onClose();
                }
            }

        } catch (error) {
            setError(
                taskToEdit
                    ? "Failed to update task. Please try again."
                    : "Failed to create task. Please try again."
            );
        }

    }


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {taskToEdit ? "Edit Task" : "Add New Task"}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                                {taskToEdit
                                    ? "Update your task details."
                                    : "Create a task and stay on track."}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 text-xl"
                    >
                        ×
                    </button>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    {/* Title */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Complete DAA Assignment"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-500"
                        />

                    </div>


                    {/* Description */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Add some details about this task..."
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-500 resize-none"
                        ></textarea>

                    </div>


                    {/* Category + Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-slate-200"
                            >
                                <option>Assignment</option>
                                <option>Exam</option>
                                <option>Project</option>
                                <option>Personal</option>
                            </select>

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-slate-200"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                        </div>

                    </div>


                    {/* Due Date */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-200"
                        />

                    </div>


                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}


                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800"
                        >
                            {taskToEdit ? "Save Changes" : "Create Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default TaskForm;