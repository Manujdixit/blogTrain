import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import Skeletonui from "../components/SkeletonUI";
import { Pagination } from "@nextui-org/react";

export const Blogs = () => {
  const [currentpage, setcurrentpage] = useState(1);
  const { loading, blogs, totalpages } = useBlogs(currentpage);

  const handlePageChange = (pageNumber: number) => {
    setcurrentpage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-center flex-row">
        <div className="flex justify-center max-w-xl min-w-[300px] flex-col">
          {loading ? (
            <>
              <Skeletonui />
              <Skeletonui />
              <Skeletonui />
              <Skeletonui />
            </>
          ) : (
            <>
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  date={blog.formattedDate}
                />
              ))}
              <div className="p-5 flex justify-center">
                <Pagination
                  showShadow
                  total={totalpages}
                  page={currentpage}
                  onChange={handlePageChange}
                  initialPage={1}
                  showControls={true}
                  variant="bordered"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
