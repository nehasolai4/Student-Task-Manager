
function Sidebar({ darkMode, setDarkMode }) {
    return (
        <aside
            className={`w-64 min-h-screen border-r transition-colors ${
                darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
            }`}
        >

            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <h1
                    className={`text-xl font-bold ${
                        darkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                    StudyFlow
                </h1>
            </div>

            <nav className="p-4">

                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-900"
                }`}>
                    <span>▦</span>
                    Dashboard
                </button>

                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-2 ${
                    darkMode
                        ? "text-slate-300 hover:bg-slate-800"
                        : "text-slate-600 hover:bg-slate-50"
                }`}>
                    <span>✓</span>
                    Tasks
                </button>

            </nav>

            <div
                className={`p-4 border-t mt-4 ${
                    darkMode ? "border-slate-800" : "border-slate-200"
                }`}
            >

                <div className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-600">
                    <div className="flex items-center gap-3">
                        <span>🌙</span>
                        <span className={darkMode ? "text-slate-200" : "text-slate-600"}>
                            Dark Mode
                        </span>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-10 h-6 rounded-full relative transition ${
                            darkMode ? "bg-slate-900" : "bg-slate-200"
                        }`}
                    >
                        <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition ${
                                darkMode ? "left-5" : "left-1"
                            }`}
                        ></span>                    
                    </button>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;