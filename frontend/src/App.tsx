import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import AI from "./pages/AI";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
const user = JSON.parse(
    localStorage.getItem("user") || "null"
);
function App() {
    return (
        <Routes>

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to="/" replace />
                        : <Login />
                }
            />

            <Route
                path="/"
                element={
                    user
                        ? <Layout />
                        : <Navigate to="/login" replace />
                }
            >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="tasks"
                    element={<Tasks />}
                />

                <Route
                    path="planner"
                    element={<Planner />}
                />

                <Route
                    path="calendar"
                    element={<Calendar />}
                />

                <Route
                    path="analytics"
                    element={<Analytics />}
                />

                <Route
                    path="ai"
                    element={<AI />}
                />

                <Route
                    path="settings"
                    element={<Settings />}
                />

            </Route>

        </Routes>
    );
}

export default App;