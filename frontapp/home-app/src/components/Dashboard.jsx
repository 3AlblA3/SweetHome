import React from "react";
import logoImage from "../images/home.webp"; 

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-15 rounded-full bg-blue-200 overflow-hidden flex items-center justify-center">
            <img
              src={logoImage}
              alt="Logo"
              className="w-10 h-10 object-cover"
            />
          </div>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Disconnect
          </button>
          <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" src="/path/to/avatar.jpg" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations sidebar */}
        <aside className="w-60 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
          <h2 className="font-semibold mb-4">Vos dernières conversations</h2>
          <ul>
            {/* Dummy conversation items */}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A11.955 11.955 0 0112 15c2.5 0 4.81.75 6.879 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A11.955 11.955 0 0112 15c2.5 0 4.81.75 6.879 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span>User 2</span>
            </li>
            {/* Add more dummy users as needed */}
          </ul>
        </aside>

        {/* Posts main content */}
        <main className="flex-1 p-6 overflow-auto bg-blue-400">
  <h1 className="text-white font-bold text-2xl mb-6 text-center">
    Welcome back User
  </h1>

  {/* Container with max width and centered */}
  <div className="max-w-3xl mx-auto flex flex-col space-y-6">
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Post title 1</h2>
      <p>This is the content of post 1</p>
    </div>
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Post title 2</h2>
      <p>This is the content of post 2</p>
    </div>
    {/* Add more posts here */}
  </div>
</main>

      </div>
    </div>
  );
};

export default Dashboard;
