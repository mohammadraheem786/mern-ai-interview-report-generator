import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import AnalyzeInterview from "./features/ai/pages/AnalyzeInterview.jsx";
import SingleReport from "./features/ai/pages/SingleReport.jsx";
import ReportHistory from "./features/ai/pages/ReportHistory.jsx";

// ─────────────────────────────
// Layout with Navbar
// ─────────────────────────────
const Layout = () => (
    <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <Outlet />
    </div>
);

export const router = createBrowserRouter([

    // ─────────────────────────────
    // Public Routes (no navbar)
    // ─────────────────────────────
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },

    // ─────────────────────────────
    // Protected Routes (with navbar)
    // ─────────────────────────────
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <Protected>
                        <AnalyzeInterview />
                    </Protected>
                )
            },
            {
                path: "/report/:id",
                element: (
                    <Protected>
                        <SingleReport />
                    </Protected>
                )
            },
            {
                path: "/history",
                element: (
                    <Protected>
                        <ReportHistory />
                    </Protected>
                )
            }
        ]
    }
]);