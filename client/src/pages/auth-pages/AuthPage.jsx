import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/authContext";

const AuthPage = () => {
  return (
    <AuthProvider>
      <div className="h-dvh w-full">
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default AuthPage;
