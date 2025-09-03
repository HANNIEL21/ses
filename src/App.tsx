import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

import Welcome from "./Screens/Welcome";
import Login from "./Screens/auth/Login";
import ForgotPassword from "./Screens/auth/ForgotPassword";
import ResetPassword from "./Screens/auth/ResetPassword";
import VerifyEmail from "./Screens/auth/VerifyEmail";
import User from "./Screens/user/user/User";
import LecturersList from "./Screens/user/lecturers/Lecturers";
import Root from "./Screens/dashboard/Root";
import Overview from "./Screens/dashboard/overview/Overview";
import Visitor from "./Screens/dashboard/visitors/Visitor";
import AppraisalScreen from "./Screens/dashboard/appraisals/Appraisals";
import Admins from "./Screens/dashboard/admins/Admins";
import Lecturers from "./Screens/dashboard/Lecturers/Lecturers";
import Analysis from "./Screens/dashboard/analysis/Analysis";
import Report from "./Screens/dashboard/reports/Report";
import Appraisal from "./Screens/dashboard/appraisal/Appraisal";
import Faculties from "./Screens/dashboard/faculties/Faculties";
import Departments from "./Screens/dashboard/departments/Departments";
import Role from "./Screens/dashboard/role/Role";
import UserRoot from "./Screens/user/UserRoot";
import ApprasalForm from "./Screens/user/appraisal/ApprasalForm";
import Register from "./Screens/auth/Register";

function App() {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* User routes */}
          <Route path="/user" element={<UserRoot />}>
            <Route index element={<User />} />
            <Route path="appraise" element={<LecturersList />} />
            <Route path="appraise/:id" element={<ApprasalForm />} />
          </Route>

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={user && token ? <Root /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Overview />} />
            <Route path="visitor" element={<Visitor />} />
            <Route path="appraisals" element={<AppraisalScreen />} />
            <Route path="admins" element={<Admins />} />
            <Route path="lecturers" element={<Lecturers />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="report" element={<Report />} />
            <Route path="appraisal" element={<Appraisal />} />
            <Route path="faculties" element={<Faculties />} />
            <Route path="departments" element={<Departments />} />
            <Route path="roles" element={<Role />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
