import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, settitle] = useState("");
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
      <div className="px-5 flex justify-center mt-32">
        <div className="max-w-screen-lg w-full bg-slate-200 p-20 rounded-lg">
          <div className="mb-5 flex justify-between items-center">
            <Input
              onChange={(e) => settitle(e.target.value)}
              className="max-w-full"
              size="lg"
              isRequired={true}
              type="text"
              label="Title"
            />
          </div>
          <Textarea
            onChange={(e) => setcontent(e.target.value)}
            size="lg"
            isRequired={true}
            label="Description"
            placeholder="Enter your description"
          />
          <div className="w-full flex justify-center m-10">
            <div className="pl-4 flex gap-3">
              <Button onClick={draft} size="lg" color="primary">
                Save as draft
              </Button>
              <Button onClick={publish} size="lg" color="success">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
