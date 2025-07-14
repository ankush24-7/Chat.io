import { useState } from "react";
import authAPI from "@/services/api/authAPI";
import { useToast } from "@/contexts/toastContext";
import { authPageIcons } from "@/assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import SpinLoader from "@/components/loaders/SpinLoader";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { input, password } = e.target;
    const user = {
      input: input.value,
      password: password.value,
    };
    if (!user.input || !user.password) {
      setIsLoading(false);
      setToastMessage({ message: "Please fill all fields", type: "error", position: "top-center" });
      return;
    }

    const res = await authAPI.authenticate(user, "login");
    setIsLoading(false);
    if (res === 200) {
      navigate("/chat");
      setToastMessage({ 
        type: "success",
        position: "top-center",
        message: "Welcome Back", 
      });
    }
    else setToastMessage({ message: res, type: "error", position: "top-center" });
  };

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide sm:pb-10 bg-gradient-to-b from-grad-top to-grad-bottom">
      <div className="flex flex-col items-center w-full md:w-[35%] md:rounded-2xl h-full md:h-fit px-10 pt-8 pb-16 sm:mt-20 mx-auto bg-black/30">
        <p className="text-white text-3xl">Welcome Back</p>
        <form className="flex flex-col w-full mt-10" onSubmit={handleSubmit}>
          <label htmlFor="input" className="text-white">
            Email or Username
          </label>
          <input
            id="input"
            name="input"
            type="text"
            placeholder="Email or Username"
            className="p-2.5 rounded-md focus:outline-none border-2 border-white bg-white"
          />

          <label className="text-white mt-6">Password</label>
          <span
            className="flex justify-between bg-white rounded-md border-2 border-white">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2.5 rounded-l-md focus:outline-none grow"
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

          <button
            type="submit"
            className="flex items-center justify-center p-3 mt-10 rounded-md mb-4 w-full cursor-pointer text-prim-text bg-prim-accent hover:bg-accent-hover">
            {isLoading ? (
              <SpinLoader width="24px" height="24px" color="#FFF" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-start text-sm text-second-text">
          {"Don't have an account? "}
          <Link to="/sign-up">
            <span className="underline text-blue-300">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
