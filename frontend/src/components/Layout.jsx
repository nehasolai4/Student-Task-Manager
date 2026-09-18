import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children,darkMode, setDarkMode }) {
    return (
        <div
            className={`min-h-screen flex transition-colors ${
                darkMode ? "bg-slate-950" : "bg-slate-50"
            }`}
        >

            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="flex-1 min-w-0">

                <Navbar darkMode={darkMode}/>

            <main
                className={`min-h-[calc(100vh-4rem)] p-6 transition-colors ${
                    darkMode
                        ? "bg-slate-950 text-slate-100"
                        : "bg-slate-50 text-slate-900"
                }`}
            >
                {children}
            </main>

            </div>

        </div>
    );
}

export default Layout;