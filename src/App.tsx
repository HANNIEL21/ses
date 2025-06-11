import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import Welcome from "./Screens/Welcome";
import Login from "./Screens/auth/Login";
import ForgotPassword from "./Screens/auth/ForgotPassword";
import ResetPassword from "./Screens/auth/ResetPassword";
import VerifyEmail from "./Screens/auth/VerifyEmail";

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
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
