import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  content: string;
  summary: string;
  title: string;
  id: number;
  published: boolean;
  author: { name: string; about: string };
  formattedDate: string;
  formattedTime: string;
}

interface BlogCardType {
  author: any;
  formattedDate: string;
  id: number;
  title: string;
  summary: string;
}

export const useBlogs = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogCardType[]>([]);
  const [totalpages, settotalpages] = useState<number>(1);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/bulk/bulk?page=${page}&limit=7`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const formattedBlogs = res.data.bulk.map((blogData: any) => {
          const dateTime = new Date(blogData.datetime);
          const year = dateTime.getFullYear();
          const month = dateTime.getMonth() + 1;
          const day = dateTime.getDate();
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();
          const formattedDate = `${day}/${month}/${year}`;
          const formattedTime = `${hours}:${minutes}`;
          return {
            ...blogData,
            summary: blogData.summary,
            formattedDate,
            formattedTime,
          };
        });
        setBlogs(formattedBlogs);
        settotalpages(res.data.pagination.totalPages);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [page]);
  return { loading, blogs, totalpages };
};

export const profileBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/blog/profile/blogs`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBlogs(res.data.data.blogs);
      } catch (error) {
        console.error("error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const blogData = res.data;
        const dateTime = new Date(blogData.datetime);
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1;
        const day = dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
        const formattedBlog = {
          ...blogData,
          formattedDate,
          formattedTime,
        };
        setBlog(formattedBlog);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};
