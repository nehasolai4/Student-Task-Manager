import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import TaskForm from "./components/TaskForm";
import { getTasks,createTask } from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTaskForm, setShowTaskForm] = useState(false);

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

    return (
        <Layout>
            <div className="mb-6 bg-white border border-slate-200 rounded-xl p-5">

              <h3 className="font-semibold text-slate-900">
                  Backend Connection Test
              </h3>

              {loading && (
                  <p className="text-slate-500 mt-2">
                      Loading tasks...
                  </p>
              )}

              {error && (
                  <p className="text-red-500 mt-2">
                      {error}
                  </p>
              )}

              {!loading && !error && (
                  <p className="text-green-600 mt-2">
                      Successfully fetched {tasks.length} task(s) from MongoDB!
                  </p>
              )}

            </div>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Good morning, Student 👋
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Here's what's happening with your tasks today.
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

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-500">
                        Total Tasks
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {totalTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        All your tasks
                    </p>
                </div>


                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-500">
                        Pending
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {pendingTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        Tasks to complete
                    </p>
                </div>


                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-500">
                        Completed
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {completedTasks}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                        Great progress
                    </p>
                </div>


                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-500">
                        High Priority
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
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
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Upcoming Tasks
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Tasks you need to focus on
                            </p>
                        </div>

                        <button className="text-sm text-slate-600 hover:text-slate-900">
                            View all
                        </button>

                    </div>

                    {/* Real Tasks */}
                    {tasks.length === 0 ? (

                        <div className="px-6 py-10 text-center">

                            <p className="text-slate-500">
                                No tasks yet.
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Add a task to get started.
                            </p>

                        </div>

                    ) : (

                        tasks.slice(0, 5).map((task) => (

                            <div
                                key={task._id}
                                className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4"
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

                                        <h4 className="font-medium text-slate-900 truncate">
                                            {task.title}
                                        </h4>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {task.category} · {task.priority} Priority
                                        </p>

                                    </div>

                                </div>

                                <p className="text-sm text-slate-500 whitespace-nowrap">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </p>

                            </div>

                        ))

                    )}

                </div>

                {/* Progress */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">

                    <h3 className="font-semibold text-slate-900">
                        Your Progress
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Keep up the momentum
                    </p>

                    <div className="flex justify-center py-8">

                        <div className="w-36 h-36 rounded-full border-8 border-slate-200 flex items-center justify-center">

                            <div className="text-center">

                                <p className="text-3xl font-bold text-slate-900">
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
                    onClose={() => setShowTaskForm(false)}
                    onTaskCreated={handleTaskCreated}
                />
            )}
        </Layout>
    );
}

export default App;