import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/blogs");
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-1/2 w-1/2">
        <DotLottieReact src="/welcome.lottie" loop autoplay />
      </div>
    </div>
  );
};
