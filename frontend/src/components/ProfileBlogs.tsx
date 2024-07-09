import { Link } from "react-router-dom";

interface BlogCardType {
  id: number;
  title: string;
  summary: string;
}

const BlogCard = ({ title, id, summary }: BlogCardType) => {
  // console.log(title);

  return (
    <Link to={`/blog/${id}`}>
      <div className="rounded-3xl bg-[#19191b] flex p-5 flex-col cursor-pointer">
        <div className="text-xl text-white mb-10">{title}</div>
        <div className="flex-grow">
          <div className="text-sm text-white mb-5">{summary}</div>
        </div>
        <div className="text-slate-50 text-right cursor-pointer">
          Read more {"->"}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
