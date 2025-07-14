import { useState } from "react";
import authAPI from "@/services/api/authAPI";
import validate from "@/utils/validateForm";
import { useToast } from "@/contexts/ToastContext";
import { authPageIcons } from "@/assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import SpinLoader from "@/components/loaders/SpinLoader";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToastMessage } = useToast();
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [colors, setColors] = useState({
    fullName: "white",
    username: "white",
    email: "white",
    password: "white",
    confirmPassword: "white",
  });
  const displayColors = [
    "#E00000",
    "#F59F00",
    "#B1401B",
    "#F0192E",
    "#5E807F",
    "#4E6A69",
    "#336699",
    "#8300E0",
    "#C51BC5",
    "#008F70",
    "#625141",
    "#545964",
  ];

  const validateField = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        validate.validateFullName(value, setColors, setErrors);
        break;
      case "username":
        validate.validateUsername(value, setColors, setErrors);
        break;
      case "email":
        validate.validateEmail(value, setColors, setErrors);
        break;
      case "password":
        setPassword(value);
        validate.validatePassword(value, setColors, setErrors);
        validate.confirmPassword(password, value, setColors, setErrors);
        break;
      case "confirmPassword":
        validate.confirmPassword(password, value, setColors, setErrors);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { fullName, username, email, password } = e.target;
    const user = {
      fullName: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      color: displayColors[Math.floor(Math.random() * displayColors.length)],
    };
    if (!user.fullName || !user.username || !user.email || !user.password) {
      setIsLoading(false);
      setToastMessage({ message: "Please fill all fields", type: "error", position: "top-center" });
      return;
    }
    
    const res = await authAPI.authenticate(user, "register");
    setIsLoading(false);
    if (res === 201) {
      navigate("/chat");
      setToastMessage({ 
        type: "success",
        position: "top-center",
        message: "Welcome to Chat.io", 
      });
    }
    else setToastMessage({ message: res, type: "error", position: "top-center" });
  };

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide sm:pb-10 bg-gradient-to-b from-grad-top to-grad-bottom">
      <div className="auth-form flex flex-col items-center w-full md:w-[35%] md:rounded-2xl h-full md:h-fit px-10 pt-8 pb-10 sm:mt-10 mx-auto bg-black/30">
        <p className="text-white text-3xl">Create Your Account</p>
        <form className="flex flex-col w-full mt-5" onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="text-white">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.fullName }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.fullName}</p>
          
          <label htmlFor="username" className="text-white">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.username }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.username}</p>

          <label className="text-white mt-2">Email Address</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.email }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.email}</p>

          <label className="text-white mt-2">Password</label>
          <span 
            style={{ "borderColor": colors.password }}
            className="flex justify-between bg-white rounded-md border-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a Password"
              onChange={(e) => validateField(e)}
              className="px-2.5 py-2 rounded-l-md focus:outline-none grow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-r-md w-10 cursor-pointer bg-white hover:bg-black/[0.15]">
              {showPassword ? (
                <authPageIcons.HidePassword fill="#818181" className="w-5 mx-auto" />
              ) : (
                <authPageIcons.ShowPassword fill="#818181" className="w-5 mx-auto" />
              )}
            </button>
          </span>
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.password}</p>

          <label className="text-white mt-2">Confirm Password</label>
          <span 
            style={{ "borderColor": colors.confirmPassword }}
            className="flex justify-between bg-white rounded-md border-2">
            <input
              id="confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              onChange={(e) => validateField(e)}
              className="px-2.5 py-2 rounded-l-md focus:outline-none grow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-r-md w-10 cursor-pointer bg-white hover:bg-black/[0.15]">
              {showPassword ? (
                <authPageIcons.HidePassword fill="#818181" className="w-5 mx-auto" />
              ) : (
                <authPageIcons.ShowPassword fill="#818181" className="w-5 mx-auto" />
              )}
            </button>
          </span>
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.confirmPassword}</p>

          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-md mt-5 mb-2 w-full cursor-pointer text-prim-text bg-prim-accent hover:bg-accent-hover">
            {isLoading ? (
              <SpinLoader width="24px" height="24px" color="#FFF" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-start text-sm text-second-text">
          {"Already have an account? "}
          <Link to="/login">
            <span className="underline text-blue-300">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
