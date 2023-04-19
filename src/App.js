import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PomodoroTimerPage from "./pages/PomodoroTimerPage";
import ToDoListPage from "./pages/ToDoListPage";
import DashboardPage from "./pages/DashboardPage";
import TimetablePage from "./pages/TimetablePage";
import NotFoundPage from "./pages/NotFoundPage";
import TopNavigation from "./components/layouts/TopNavigation";

function App() {
  return (
    <BrowserRouter>
      <TopNavigation />
      <Routes>
        <Route path="/" element={<PomodoroTimerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/todo" element={<ToDoListPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
