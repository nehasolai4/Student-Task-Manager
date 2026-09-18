import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import TaskForm from "./components/TaskForm";
import { getTasks,createTask,toggleTaskComplete,deleteTask,updateTask} from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskFilter, setTaskFilter] = useState("All");
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                setError("Could not load tasks");
            } finally {
                setLoading(false);
            }
        }

        loadTasks();
    }, []);

    async function handleTaskCreated(taskData) {

        const newTask = await createTask(taskData);

        setTasks((currentTasks) => [
            ...currentTasks,
            newTask
        ]);

        return newTask;
    }


    async function handleToggleComplete(taskId) {
        try {
            const updatedTask = await toggleTaskComplete(taskId);

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task._id === updatedTask._id
                        ? updatedTask
                        : task
                )
            );
        } catch (error) {
            setError("Could not update task status.");
        }
    }


    async function handleDeleteTask(taskId) {
        try {
            await deleteTask(taskId);

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task._id !== taskId
                )
            );
        } catch (error) {
            setError("Could not delete task.");
        }
    }

    async function handleTaskUpdated(taskId, taskData) {
        try {
            const updatedTask = await updateTask(taskId, taskData);

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task._id === updatedTask._id
                        ? updatedTask
                        : task
                )
            );

            return updatedTask;
        } catch (error) {
            setError("Could not update task.");
            throw error;
        }
    }

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) => task.priority === "High" && !task.completed
    ).length;

    const completionPercentage =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);


    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        if (taskFilter === "Pending") {
            return !task.completed;
        }

        if (taskFilter === "Completed") {
            return task.completed;
        }

        if (taskFilter === "High Priority") {
            return task.priority === "High" && !task.completed;
        }

        return true;
    });

    return (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h2
                        className={`text-2xl font-bold ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        Your study flow, at a glance.
                    </h2>

                    <p
                        className={`mt-1 ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                    >
                        Stay on top of what matters most.
                    </p>
                </div>

                <button
                    onClick={() => setShowTaskForm(true)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
                >
                    + Add Task
                </button>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                <div
                    className={`rounded-xl p-5 border ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <p
                        className={`text-sm ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                    >
                        Total Tasks
                    </p>

                    <p
                        className={`text-3xl font-bold mt-2 ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        {totalTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        All your tasks
                    </p>
                </div>


                <div
                    className={`rounded-xl p-5 border ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <p
                        className={`text-sm ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                    >
                        Pending
                    </p>

                    <p
                        className={`text-3xl font-bold mt-2 ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        {pendingTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        Tasks to complete
                    </p>
                </div>


                <div
                    className={`rounded-xl p-5 border ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <p
                        className={`text-sm ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                    >
                        Completed
                    </p>

                    <p
                        className={`text-3xl font-bold mt-2 ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        {completedTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        Great progress
                    </p>
                </div>


                <div
                    className={`rounded-xl p-5 border ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <p
                        className={`text-sm ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                    >
                        High Priority
                    </p>

                    <p
                        className={`text-3xl font-bold mt-2 ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        {highPriorityTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        Need your attention
                    </p>
                </div>

            </div>


            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Upcoming Tasks */}
                <div
                    className={`lg:col-span-2 rounded-xl border ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >

                    <div
                        className={`flex items-center justify-between px-6 py-5 border-b ${
                            darkMode ? "border-slate-800" : "border-slate-200"
                        }`}
                    >

                        <div>
                            <h3
                                className={`font-semibold ${
                                    darkMode ? "text-white" : "text-slate-900"
                                }`}
                            >
                                Upcoming Tasks
                            </h3>
                            <p
                                className={`text-sm mt-1 ${
                                    darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                            >
                                Tasks you need to focus on
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">

                              {["All", "Pending", "Completed", "High Priority"].map((filter) => (
                                  <button
                                      key={filter}
                                      onClick={() => setTaskFilter(filter)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                            taskFilter === filter
                                                ? darkMode
                                                    ? "bg-white text-slate-900"
                                                    : "bg-slate-900 text-white"
                                                : darkMode
                                                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                  >
                                      {filter}
                                  </button>
                              ))}

                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    className={`w-full max-w-md px-4 py-2.5 rounded-lg outline-none border ${
                                    darkMode
                                        ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-slate-700"
                                        : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200"
                                    }`}
                                />
                            </div>
                        </div>
                            <button
                                className={`text-sm ${
                                    darkMode
                                        ? "text-slate-300 hover:text-white"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                View all
                            </button>

                    </div>

                    {/* Real Tasks */}
                    {filteredTasks.length === 0 ? (

                        <div className="px-6 py-10 text-center">

                            <p className="text-slate-500">
                                No tasks yet.
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Add a task to get started.
                            </p>

                        </div>

                    ) : (

                        filteredTasks
                        .slice(0, 5).map((task) => (
                            <div
                                key={task._id}
                                className={`px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition ${
                                    darkMode
                                        ? "border-slate-800 hover:bg-slate-800/50"
                                        : "border-slate-100 hover:bg-slate-50"
                                }`}
                            >

                                <div className="flex items-start gap-3 min-w-0">

                                    <div
                                        className={`w-2 h-2 rounded-full mt-2 ${
                                            task.priority === "High"
                                                ? "bg-red-500"
                                                : task.priority === "Medium"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                    ></div>

                                    <div className="min-w-0">
                                        <h4
                                            className={`font-medium truncate ${
                                                task.completed
                                                    ? "text-slate-400 line-through"
                                                    : darkMode
                                                        ? "text-white"
                                                        : "text-slate-900"
                                            }`}
                                        >
                                            {task.title}
                                        </h4>
                                        <p
                                            className={`text-sm mt-1 ${
                                                task.completed
                                                    ? "text-slate-400"
                                                    : darkMode
                                                        ? "text-slate-400"
                                                        : "text-slate-500"
                                            }`}
                                        >
                                            {task.category} · {task.priority} Priority
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-auto">

                                    <div className="text-right">
                                        <p
                                            className={`text-sm whitespace-nowrap ${
                                                !task.completed && new Date(task.dueDate) < new Date()
                                                    ? "text-red-600 font-medium"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </p>

                                        {!task.completed && new Date(task.dueDate) < new Date() && (
                                            <p className="text-xs text-red-500 mt-1">
                                                Overdue
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleToggleComplete(task._id)}
                                        className="text-sm text-green-600 hover:text-green-800"
                                    >
                                        ✓
                                    </button>

                                    <button
                                        onClick={() => {
                                            setTaskToEdit(task);
                                            setShowTaskForm(true);
                                        }}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => setTaskToDelete(task)}
                                        className="text-sm text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Progress */}
                <div
                    className={`rounded-xl border p-6 ${
                        darkMode
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >

                    <h3
                        className={`font-semibold ${
                            darkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        Your Progress
                    </h3>
                    <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">
                                Overall completion
                            </span>

                            <span
                                className={`text-sm font-semibold ${
                                    darkMode ? "text-white" : "text-slate-900"
                                }`}
                            >
                                {completionPercentage}%
                            </span>
                        </div>

                        <div
                            className={`w-full h-3 rounded-full overflow-hidden ${
                                darkMode ? "bg-slate-800" : "bg-slate-100"
                            }`}
                        >
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                darkMode ? "bg-white" : "bg-slate-900"
                            }`}
                            style={{
                                width: `${completionPercentage}%`
                            }}
                        ></div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                        Keep up the momentum
                    </p>

                    <div className="flex justify-center py-8">

                        
                    <div
                        className={`w-36 h-36 rounded-full border-8 flex items-center justify-center ${
                            darkMode ? "border-slate-700" : "border-slate-200"
                        }`}
                    >
                            <div className="text-center">

                                <p
                                    className={`text-3xl font-bold ${
                                        darkMode ? "text-white" : "text-slate-900"
                                    }`}
                                >
                                    {completionPercentage}%
                                </p>

                                <p className="text-xs text-slate-500">
                                    completed
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="text-center">

                        <p className="text-sm text-slate-600">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                            You're making progress!
                        </p>

                    </div>

                </div>

            </div>
            {showTaskForm && (
                  <TaskForm
                      onClose={() => {
                          setShowTaskForm(false);
                          setTaskToEdit(null);
                      }}
                      onTaskCreated={handleTaskCreated}
                      onTaskUpdated={handleTaskUpdated}
                      taskToEdit={taskToEdit}
                  />
            )}

            {taskToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6">

                        <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl mb-4">
                            !
                        </div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Delete task?
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-slate-700">
                                "{taskToDelete.title}"
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setTaskToDelete(null)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await handleDeleteTask(taskToDelete._id);
                                    setTaskToDelete(null);
                                }}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </Layout>
    );
}

export default App;