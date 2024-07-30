import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-gray-400 my-5 block lg:hidden text-[10px]">
        BlogTrain
      </h1>
      <div className="w-full  px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="flex justify-center">
            <Auth type="signup" />
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <Quote type="signup" />
          </div>
        </div>
      </div>
    </div>
  );
};
