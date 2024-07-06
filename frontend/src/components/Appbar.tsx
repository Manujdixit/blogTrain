// import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useEffect, useState } from "react";

const Appbar = () => {
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/blogs"} className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              Blogsy
            </h1>
          </Link>

          {username && (
            <div className="flex items-center">
              <Link to={`/publish`}>
                <button
                  type="button"
                  className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium rounded-md text-sm px-4 py-2 transition-colors"
                >
                  New Post
                </button>
              </Link>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full"
                >
                  <Avatar size={"big"} name={username} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                    <Link to="/profile">
                      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Appbar;
