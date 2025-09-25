import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [userId, setUserId] = useState(null);
  const [usersMap, setUsersMap] = useState({}); // { userId: {first_name, last_name, ...} }
  // Fetch posts and conversations from backend on mount
  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (response.ok) {
          let data = await response.json();
          if (data.length && data[0].createdAt) {
            data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        setPosts([]);
      }
    };

    // Fetch authenticated user to get userId
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/users/me", { credentials: "include" });
        if (res.ok) {
          const user = await res.json();
          setUserId(user.id);
        }
      } catch {}
    };

    // Fetch conversations and then fetch user info for the other participant
    const fetchConversationsAndUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/conversations", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
          // Find all unique user IDs (other than self)
          let otherUserIds = [];
          if (userId) {
            otherUserIds = data.map(conv => (conv.user1_id === userId ? conv.user2_id : conv.user1_id));
            // Remove duplicates
            otherUserIds = [...new Set(otherUserIds)];
            // Fetch user info for each
            const userFetches = otherUserIds.map(uid =>
              fetch(`http://localhost:5000/users/${uid}`, { credentials: "include" })
                .then(r => r.ok ? r.json() : null)
            );
            const users = await Promise.all(userFetches);
            const map = {};
            users.forEach(u => { if (u) map[u.id] = u; });
            setUsersMap(map);
          }
        }
      } catch {}
    };

    fetchPosts();
    fetchUser().then(fetchConversationsAndUsers);
  }, [userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Logout error");
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePost = () => {
    // This function should be updated to POST to backend if you want to create posts from frontend
    if (!inputValue.trim()) return;
    // ...existing code for local post creation (optional, for demo only)
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
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded mr-4 md:mr-15 text-sm md:text-base"
          >
            Disconnect
          </button>
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
            {conversations.length === 0 && (
              <li className="text-gray-500">No conversations</li>
            )}
            {conversations.map((conv) => {
              if (!userId) return null;
              const otherUserId = conv.user1_id === userId ? conv.user2_id : conv.user1_id;
              const otherUser = usersMap[otherUserId];
              return (
                <li
                  key={conv.id}
                  className="p-2 rounded mb-2 hover:bg-blue-200 cursor-pointer flex items-center space-x-2"
                  onClick={() => navigate(`/chat/${conv.id}`)}
                >
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
                  <span>{otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Unknown"}</span>
                </li>
              );
            })}
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
    {posts.map((post) => (
      <div key={post.id} className="bg-white p-6 rounded-xl shadow-md">
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