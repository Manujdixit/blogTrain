import React, { useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Modal = ({ showModal, setShowModal, title, content }) => {
  const [currentDateTime] = useState(new Date());

  const formattedDate = `${currentDateTime.toLocaleDateString()}`;
  const formattedTime = `${currentDateTime.toLocaleTimeString()}`;

  useEffect(() => {
    // Add event listener to detect clicks outside the modal
    const handleOutsideClick = (e) => {
      if (showModal && !e.target.closest(".modal-content")) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-32">
          <div className="relative p-8 bg-white w-full max-w-4xl mx-auto flex-col flex rounded-lg shadow-lg border border-gray-300 max-h-full overflow-y-auto">
            <div className="col-span-8">
              <div className="text-5xl font-extrabold">{title}</div>
              <div className="text-slate-500 pt-2">
                Posted on {formattedDate} at {formattedTime}
              </div>
              <div
                className="pt-2"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
          <div className="w-10 h-10 bg-red-700 m-10 rounded-full flex justify-center items-center">
            <button
              onClick={() => setShowModal(false)}
              className="text-white hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    console.log({ title, content });
    // Here you would typically send the data to your backend
  };

  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your blog title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className=""
          />
          <p className="text-sm text-gray-500">Word count: {wordCount}</p>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handlePreview}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Preview
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish Blog Post
            </button>
          </div>
        </div>
      </form>
      <Modal
        showModal={showPreview}
        setShowModal={setShowPreview}
        title={title}
        content={content}
      />
    </div>
  );
};

export default Publish;
