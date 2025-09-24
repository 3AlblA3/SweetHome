import React from "react";

const Chat = () => {
    return (
        <div className="min-h-screen flex flex-col bg-blue-500">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          {/* Home icon */}
          <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
            </svg>
          </div>
          {/* Title */}
          <span className="text-gray-700 font-semibold">Index</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Disconnect
          </button>
          <button className="w-10 h-10 border border-gray-500 rounded-full flex justify-center items-center">
            {/* User icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 p-6 gap-6">
        {/* Sidebar with conversations */}
        <aside className="w-40 bg-white rounded-lg p-4 flex flex-col items-center space-y-4">
          <div className="text-blue-900 font-semibold mb-2 text-center">Vos dernières conversations</div>
          
        </aside>

        {/* Conversation message boxes */}
        <section className="flex-1 flex flex-col space-y-6">
          <h2 className="text-white font-bold text-xl">Welcome back Paul</h2>
           <div
              
              className="bg-white rounded-lg p-4 flex items-start space-x-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-600"
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
              <div className="flex-1">
                <p className="text-gray-800">Conversation content here...</p>
              </div>
            </div>
          
        </section>
      </main>
    </div>
    )
}

export default Chat;