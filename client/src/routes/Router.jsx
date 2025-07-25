import App from "@/App";
import "@/assets/styles/scrollbars.css";
import ChatPage from "@/pages/chat-page/ChatPage";
import AuthPage from "@/pages/auth-pages/AuthPage";
import GuestPage from "@/pages/guest-page/GuestPage";
import LoginPage from "@/pages/auth-pages/LoginPage";
import SignUpPage from "@/pages/auth-pages/SignUpPage";
import { ToastProvider } from "@/contexts/toastContext";
import { SocketProvider } from "@/contexts/socketContext";
import ProfilePage from "@/pages/profile-page/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<GuestPage />} />
            <Route path="/auth" element={<AuthPage />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/sign-up" element={<SignUpPage />} />
            </Route>
            <Route path="/" element={<App />}>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
            </Route>
          </Routes>
        </SocketProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default Router;
