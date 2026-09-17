import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 flex">

            <Sidebar />

            <div className="flex-1 min-w-0">

                <Navbar />

                <main className="p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;