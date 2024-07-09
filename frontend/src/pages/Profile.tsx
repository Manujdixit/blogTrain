import { useEffect, useState } from "react";
import { profileBlogs } from "../hooks";
// import { Pagination } from "@nextui-org/react";
import BlogCard from "../components/ProfileBlogs";

export const Profile = () => {
  const [username, setusername] = useState("");
  const { loading, blogs } = profileBlogs();

  // console.log(total);
  // const handlePageChange = (pageNumber: number) => {
  //   setcurrentpage(pageNumber);
  // };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setusername(storedUsername);
    }
  }, []);

  return (
    <div className="">
      <div className="bg-[#0F0F10] min-h-screen flex gap-5 px-20">
        <div className="w-1/2 bg-[#0F0F10] p-10 flex items-center justify-center">
          <div className="flex flex-col items-center pb-20">
            <div className="">
              <Avatar size="small" name={username} />
            </div>
            <div className="text-white text-4xl mt-4">Manuj Dixit</div>
          </div>
        </div>
        <div className="w-3/4 bg-[#0F0F10] p-20 flex flex-col columns-2 gap-32">
          <div>
            <div className="text-white text-3xl ">About</div>
            <br />
            <div className="text-white">
              John Doe is a software engineer with a passion for building
              innovative web applications. He has been working in the industry
              for over 5 years and has a strong background in full-stack
              development.
            </div>
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
