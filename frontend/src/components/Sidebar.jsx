function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200">

            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <h1 className="text-xl font-bold text-slate-900">
                    StudyFlow
                </h1>
            </div>

            <nav className="p-4">

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-100 text-slate-900 font-medium">
                    <span>▦</span>
                    Dashboard
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 mt-2">
                    <span>✓</span>
                    Tasks
                </button>

            </nav>

            <div className="p-4 border-t border-slate-200 mt-4">

                <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50">
                    ⚙ Settings
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;