import { useToast } from "./toastContext";
import { useSocket } from "./socketContext";
import authAPI from "@/services/api/authAPI";
import { useNavigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);  
  const { connectSocket, disconnectSocket } = useSocket();
  const displayColors = ["#E00000", "#F59F00", "#B1401B", "#F0192E", "#5E807F", "#4E6A69", "#336699", "#8300E0", "#C51BC5", "#008F70", "#625141", "#545964"];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    const { input, password } = e.target;
    const user = {
      input: input.value,
      password: password.value,
    };
    if (!user.input || !user.password) {
      setIsLoginLoading(false);
      setToastMessage({ message: "Please fill all fields", type: "error", position: "top-center" });
      return;
    }

    try{
      const res = await authAPI.authenticate(user, "login");
      if (res.status !== 200) throw res;
      connectSocket(res.data.userId);
      navigate("/chat");
      setToastMessage({ 
        type: "success",
        position: "top-center",
        message: "Welcome Back", 
      });
    } catch (res) {
      setToastMessage({ message: res, type: "error", position: "top-center" });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSignUpLoading(true);
    const { fullName, username, email, password } = e.target;
    const user = {
      fullName: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      color: displayColors[Math.floor(Math.random() * displayColors.length)],
    };
    if (!user.fullName || !user.username || !user.email || !user.password) {
      setIsSignUpLoading(false);
      setToastMessage({ message: "Please fill all fields", type: "error", position: "top-center" });
      return;
    }
    
    try {
      const res = await authAPI.authenticate(user, "register");
      if (res.status !== 201) throw res;
      connectSocket(res.data.userId);
      navigate("/chat");
      setToastMessage({ 
        type: "success",
        position: "top-center",
        message: "Welcome to Chat.io", 
      });
    } catch (res) {
      setToastMessage({ message: res, type: "error", position: "top-center" });
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleLogout = async () => {
    await authAPI.logout();
    disconnectSocket();
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        handleLogin, 
        handleSignUp,
        isLoginLoading,
        isSignUpLoading,
        handleLogout,
      }}>
        
      {children}
    </AuthContext.Provider>
  );
};