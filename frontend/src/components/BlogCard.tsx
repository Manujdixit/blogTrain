import { Link } from "react-router-dom";

interface BlogCardType {
  id: number;
  authorName: string;
  title: string;
  summary: string;
  date: string;
}

const BlogCard = ({ authorName, title, id, summary, date }: BlogCardType) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part: string) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 cursor-pointer">
        <div className="flex flex-row items-center">
          <div className="avatar  flex justify-center items-center bg-black w-6 h-6 rounded-full text-white font-normal text-sm">
            <span>{getInitials(authorName)}</span>
          </div>
          <div className="ml-3 flex items-center">
            <span className="font-extralight">{authorName}</span>
            <span className="text-xs px-1">&#9679;</span>
            <span className="font-light text-slate-500">{date}</span>
          </div>
        </div>

        <div className="text-xl  font-semibold">{title}</div>
        <div className="text-md font-light ">
          {summary && summary.trim() !== ""
            ? `${summary.slice(0, 100)}...`
            : "No summary available"}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white dark:text-gray-300 cursor-pointer`}
      >
        {name[0]}
      </span>
    </div>
  );
}
