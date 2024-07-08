import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  // console.log(blog);

  return (
    <div>
      {loading || !blog ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner size="lg" color="success" />
        </div>
      ) : (
        <FullBlog blog={blog} />
      )}
    </div>
  );
};
