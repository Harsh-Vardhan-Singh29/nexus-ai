import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AI from "./pages/AI";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Planner from "./pages/Planner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="planner" element={<Planner />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="ai" element={<AI />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;