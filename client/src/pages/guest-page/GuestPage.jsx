import { useEffect, useState } from "react";
import authAPI from "@/services/api/authAPI";
import { useNavigate } from "react-router-dom";
import GuestHeader from "./components/GuestHeader";
import ChatTemplate from "./components/ChatTemplate";
import { useSocket } from "@/contexts/socketContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const GuestPage = () => {
  const navigate = useNavigate();
  const { connectSocket } = useSocket();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const userId = await authAPI.refresh();
      if (userId) {
        navigate("/chat", { replace: true });
        connectSocket(userId);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  return (
    <div className="h-dvh w-full px-10 bg-gradient-to-t from-grad-top to-grad-bottom">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center pt-20">
          <DotLottieReact
            className="w-1/2 h-1/2"
            src="https://lottie.host/32b41da0-a43e-49f0-b6f8-136e591cc97a/LfYxELDKLA.lottie"
            loop
            autoplay
            backgroundColor="transparent"
            speed={1.25}
          />
          <h2 className="text-3xl mt-5 mb-2 text-white">
            Waking up the server...
          </h2>
          <p className="text-lg text-center max-w-140 leading-6 text-white">
            Thank you for your patience. This usually takes a minute or two!
          </p>
        </div>
      ) : (
        <div className="w-full h-full relative flex flex-col">
          <GuestHeader />
          <div className="w-full flex items-center justify-center gap-50 mt-10">
            <div className="flex flex-col items-start max-w-65">
              <h2 className="text-6xl text-prim-text">Connect Instantly, Chat Seamlessly</h2>
              <p className="text-lg mt-4 text-second-text">
                Connect with friends and the world around you.
              </p>
            </div>
            <ChatTemplate />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestPage;
