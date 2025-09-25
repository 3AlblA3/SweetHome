import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Dashboard = () => {
  const [posts, setPosts] = useState([
    { title: "Post title 1", content: "This is the content of post 1" },
    { title: "Post title 2", content: "This is the content of post 2" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePost = () => {
    if (!inputValue.trim()) return;
    const newPost = {
      title: `Post title ${posts.length + 1}`,
      content: inputValue.trim(),
    };
    setPosts([newPost, ...posts]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="Logo" className="ml-4 md:ml-15 w-10 md:w-12 h-10 md:h-12 object-cover" />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded mr-4 md:mr-15 text-sm md:text-base">
            Disconnect
          </Link>
          <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" src={userAvatar} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations sidebar */}
        <aside className="hidden md:block w-60 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
          <h2 className="font-semibold mb-4">Vos dernières conversations</h2>
          <ul>
            {/* Conversation items */}
            <li className="p-2 rounded mb-2 hover:bg-blue-200 cursor-pointer flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A11.955 11.955 0 0112 15c2.5 0 4.81.75 6.879 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>User 1</span>
            </li>
            <li className="p-2 rounded mb-2 hover:bg-blue-200 cursor-pointer flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A11.955 11.955 0 0112 15c2.5 0 4.81.75 6.879 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>User 2</span>
            </li>
          </ul>
        </aside>

        {/* Posts main content */}
        <main className="flex-1 p-6 overflow-hidden bg-blue-400 flex flex-col">
  <h1 className="text-white font-bold text-xl md:text-2xl mb-6 text-center">
    Welcome back User
  </h1>

  {/* Input box and button with side padding and rounded */}
  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6 px-4 md:px-24 lg:px-48">
    <input
      type="text"
      placeholder="Write your post here..."
      value={inputValue}
      onChange={handleInputChange}
      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    <button
      onClick={handlePost}
      className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
    >
      Post
    </button>
  </div>

  {/* Posts list filling remaining space, with side padding and rounded posts */}
  <div className="flex-1 overflow-auto px-4 md:px-24 lg:px-48 space-y-5">
    {posts.map((post, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-semibold text-lg mb-3">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
      </div>
    ))}
  </div>
</main>


      </div>
    </div>
  );
};

export default Dashboard;