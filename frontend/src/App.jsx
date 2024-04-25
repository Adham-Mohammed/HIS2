import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/navigation/Nav";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordPageConfirm from "./pages/ResetPasswordPageConfirm";
import ActivatePage from "./pages/ActivatePage";
import NotFoundPage from "./pages/NotFoundPage";

// front end of main program
import EMR from "../client/src/doctor/components/EMR/EMR";
import PatientList from "../client/src/doctor/components/patientList/PatientList";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activate/:uid/:token" element={<ActivatePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordPageConfirm />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/emr" element={<EMR />} />
          <Route path="/patientList" element={<PatientList />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
