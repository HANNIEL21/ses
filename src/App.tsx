import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import Welcome from "./Screens/Welcome";
import Login from "./Screens/auth/Login";
import ForgotPassword from "./Screens/auth/ForgotPassword";
import ResetPassword from "./Screens/auth/ResetPassword";
import VerifyEmail from "./Screens/auth/VerifyEmail";
import User from "./Screens/user/User";
import Root from "./Screens/dashboard/Root";
import Overview from "./Screens/dashboard/overview/Overview";
import Visitor from "./Screens/dashboard/visitors/Visitor";
import Appraisals from "./Screens/dashboard/appraisals/Appraisals";
import Admins from "./Screens/dashboard/admins/Admins";
import Lecturers from "./Screens/dashboard/lecturers/Lecturers";
import Analysis from "./Screens/dashboard/analysis/Analysis";
import Report from "./Screens/dashboard/reports/Report";
import Appraisal from "./Screens/dashboard/appraisal/Appraisal";
import Faculties from "./Screens/dashboard/faculties/Faculties";
import Departments from "./Screens/dashboard/departments/Departments";
import Role from "./Screens/dashboard/role/Role";
import Previlage from "./Screens/dashboard/previlage/Previlage";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />


          <Route path="/user" element={<User />} />


          <Route path="/dashboard" element={<Root />} >
            <Route index element={<Overview/>} />
            <Route path="visitor" element={<Visitor/>} />
            <Route path="appraisals" element={<Appraisals/>} />
            <Route path="admins" element={<Admins/>} />
            <Route path="lecturers" element={<Lecturers/>} />
            <Route path="analysis" element={<Analysis/>} />
            <Route path="report" element={<Report/>} />
            <Route path="appraisal" element={<Appraisal/>} />
            <Route path="faculties" element={<Faculties/>} />
            <Route path="departments" element={<Departments/>} />
            <Route path="roles" element={<Role/>} />
            <Route path="previlage" element={<Previlage/>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
