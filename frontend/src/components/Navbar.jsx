function Navbar({ darkMode }) {
    return (
        <header
            className={`h-16 border-b flex items-center justify-between px-6 transition-colors ${
                darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
            }`}
        >
            <div>
                <p
                    className={`text-sm ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                    Student Task Manager
                </p>
            </div>

            <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium">
                    S
                </div>

                <div className="hidden sm:block">
                <p
                    className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                    Student
                </p>
                <p className="text-xs text-slate-500">
                        Keep making progress
                    </p>
                </div>

            </div>

        </header>
    );
}

export default Navbar;