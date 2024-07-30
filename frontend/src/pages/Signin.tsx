// import { Auth } from "../components/Auth";
// import { Quote } from "../components/Quote";

// export const Signin = () => {
//   return (
//     <div>
//       <div className="grid grid-cols-2">
//         <div>
//           <Auth type="signin" />
//         </div>
//         <div className="hidden lg:block">
//           <Quote type={"signin"} />
//         </div>
//       </div>
//     </div>
//   );
// };

import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-gray-400 my-5 block lg:hidden text-[10px]">
        BlogTrain
      </h1>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full  px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className="flex justify-center">
              <Auth type="signin" />
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <Quote type="signin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
