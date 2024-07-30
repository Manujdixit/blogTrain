import { useEffect, useState } from "react";
import { profileBlogs } from "../hooks";
import BlogCard from "../components/ProfileBlogs";

export const Profile = () => {
  const [username, setusername] = useState("");
  const { loading, blogs } = profileBlogs();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setusername(storedUsername);
    }
  }, []);

  return (
    <div>
      <div className="bg-[#0F0F10] h-screen  flex ">
        <div className="w-1/3 h-full bg-[#0F0F10] p-10 flex items-center justify-center">
          <div className="flex flex-col items-center pb-20">
            <Avatar size="small" name={username} />
            <div className="text-white text-4xl mt-4">Manuj Dixit</div>
            <br />
            {/* <h3 className=" text-green-500 cursor-pointer">Edit</h3> */}
          </div>
        </div>
        <div className="overflow-auto bg-[#0F0F10] p-20 flex flex-col columns-2 gap-32">
          <div>
            <div className="text-white text-3xl ">About</div>
            <br />
            <div className="text-white">blogTrainer</div>
          </div>
          <div>
            <div className="text-white text-3xl "> Blog Posts</div>
            <br />
            <div className="grid grid-cols-3 gap-10">
              {loading ? (
                <>
                  <h1 className="text-white">loading</h1>
                </>
              ) : (
                <>
                  {blogs.map((blog) => (
                    <BlogCard
                      id={blog.id}
                      title={blog.title}
                      summary={blog.summary}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Avatar({ name, size = "small" }: { name: string; size?: "small" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-white rounded-full ${
        size === "small" ? "w-48 h-48" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-6xl" : "text-md"
        } font-extralight text-black dark:text-gray-300 cursor-pointer`}
      >
        {name[0]}
      </span>
    </div>
  );
}
