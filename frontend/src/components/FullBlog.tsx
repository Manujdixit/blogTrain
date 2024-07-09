import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

const BUCKET_ID = import.meta.env.VITE_APP_APPWRITE_BUCKET_ID;
console.log("bucket id: ", BUCKET_ID);

const FullBlog = ({ blog }: any) => {
  const [htmlContent, setHtmlContent] = useState("");
  console.log(blog.content);
  console.log(typeof blog.content);

  useEffect(() => {
    if (blog.content) {
      fetchhtmlcontent(blog.content);
    }
  }, [blog.content]);

  async function fetchhtmlcontent(_fileId: string) {
    try {
      const response = await fetch(blog.content);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const content = await response.text();
      setHtmlContent(content);
    } catch (error) {
      console.error("error fetching html contents: ", error);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 gap-8">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on {blog.formattedDate} at {blog.formattedTime}
            </div>
            {/* New Summary Section */}

            <blockquote className="my-8 p-6 bg-gray-100 border-l-4 border-blue-500 italic text-lg text-gray-700 relative">
              <svg
                className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-blue-500 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="ml-4">{blog.summary}</p>
            </blockquote>

            <div
              className="pt-2"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          </div>
          <div className="col-span-4 font-medium flex flex-row-reverse">
            <div className="max-w-sm">
              <div className="mb-4 text-slate-600 text-lg">Author</div>
              <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    size="md"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold">{blog.author.name}</div>
                  <div className="pt-2 text-slate-500 text-sm">
                    Random catch phrase about author's ability to grab the users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullBlog;
