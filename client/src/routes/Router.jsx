import App from "@/App";
import ChatPage from "@/pages/chat-page/ChatPage";
import GuestPage from "@/pages/guest-page/GuestPage";
import LoginPage from "@/pages/auth-pages/LoginPage";
import SignUpPage from "@/pages/auth-pages/SignUpPage";
import { ToastProvider } from "@/contexts/toastContext";
import ProfilePage from "@/pages/profile-page/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<GuestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<App/>}>
            <Route path="/chat" element={<ChatPage /> } />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
};

export default Router;
