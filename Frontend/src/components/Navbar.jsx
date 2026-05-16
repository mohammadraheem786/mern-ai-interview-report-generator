import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api/auth/logout", {
                withCredentials: true
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isActive = (path) =>
        location.pathname === path
            ? "text-white"
            : "text-slate-400 hover:text-white";

    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-extrabold text-white tracking-tight"
                >
                    Interview<span className="text-indigo-400">AI</span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className={`transition text-sm font-medium ${isActive("/")}`}
                    >
                        Analyze
                    </Link>
                    <Link
                        to="/history"
                        className={`transition text-sm font-medium ${isActive("/history")}`}
                    >
                        History
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;