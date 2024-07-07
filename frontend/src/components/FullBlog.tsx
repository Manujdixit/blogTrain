import { Avatar } from "@nextui-org/react";

interface Blog {
  content: string;
  title: string;
  id: number;
  published: boolean;
  author: { name: string; about: string };
  formattedDate: string;
  formattedTime: string;
}

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 gap-8">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on {blog.formattedDate} at {blog.formattedTime}
            </div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4 font-medium flex flex-row-reverse ">
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
