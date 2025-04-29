import App from "@/App";
import LoginPage from "@/pages/login-page/LoginPage";
import SignUpPage from "@/pages/signup-page/SignUpPage";
import { ToastProvider } from "@/contexts/toastContext";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
};

export default Router;
