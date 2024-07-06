import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, settitle] = useState("Write your title here");
  const [content, setcontent] = useState("");
  const navigate = useNavigate();

  function publish() {
    axios
      .post(
        `${BACKEND_URL}/api/v1/blog/create`,
        {
          title,
          content,
          published: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        navigate(`/blog/${response.data.id}`);
      })
      .catch((error) => {
        console.error("Publish failed:", error);
      });
  }
  function draft() {
    axios
      .post(
        `${BACKEND_URL}/api/v1/blog/create`,
        {
          title,
          content,
          published: false,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        navigate(`/blog/${response.data.id}`);
      })
      .catch((error) => {
        console.error("failed:", error);
      });
  }

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 p-10">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-4 flex space-x-2 border-b pb-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <span className="font-bold">B</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded italic">I</button>
            <button className="p-2 hover:bg-gray-100 rounded underline">
              U
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">H</button>
            <button className="p-2 hover:bg-gray-100 rounded">≡</button>
            <button className="p-2 hover:bg-gray-100 rounded">&lt;&gt;</button>
            <button className="p-2 hover:bg-gray-100 rounded">&#x2715;</button>
            <button className="p-2 hover:bg-gray-100 rounded">↺</button>
            <button className="p-2 hover:bg-gray-100 rounded">↻</button>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Crafting the Perfect Blog Post
          </h1>

          <p className="mb-4">
            Welcome to the world of blogging, where words come alive and stories
            unfold. In this rich text editor, you'll have the power to shape
            your narrative, add visual elements, and bring your ideas to life.
          </p>

          <h2 className="text-2xl font-bold mb-2">Formatting Options</h2>

          <p className="mb-4">
            Explore the toolbar above to unlock a world of formatting
            possibilities. <strong>Bold</strong>, <em>italic</em>, and{" "}
            <u>underline</u> your text, create
          </p>

          <h3 className="text-xl font-bold mb-2">headings</h3>

          <p>to structure your content, and organize your thoughts with</p>
        </div>
      </div>
    </>
  );
};
