import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import userAvatar from "../images/image.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [usersMap, setUsersMap] = useState({}); 


  useEffect(() => {

    // Récupérerations des informations
    const fetchAll = async () => {
      let postsData = [];
      let conversationsData = [];
      let userIdLocal = null;
      let userFirstNameLocal = "";
      // 1. Afficher les posts
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (response.ok) {
          let data = await response.json();
          if (data.length && data[0].createdAt) {
            data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          postsData = data;
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        setPosts([]);
      }

      // 2. Afficher l'utilisateur connecté
      try {
        const res = await fetch("http://localhost:5000/users/me", { credentials: "include" });
        if (res.ok) {
          const user = await res.json();
          userIdLocal = user.id;
          userFirstNameLocal = user.first_name || "";
          setUserId(userIdLocal);
          setUserFirstName(userFirstNameLocal);
        }
      } catch {}

      // 3. Afficher les conversations
      try {
        const res = await fetch("http://localhost:5000/conversations", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          conversationsData = data;
          setConversations(data);
        }
      } catch {}

      // 4. Collecter tous les IDs utilisateurs uniques des posts et conversations
      const postUserIds = postsData.map(post => post.user_id);
      let convUserIds = [];
      if (userIdLocal) {
        convUserIds = conversationsData.map(conv => (conv.user1_id === userIdLocal ? conv.user2_id : conv.user1_id));
      }
      const allUserIds = Array.from(new Set([...postUserIds, ...convUserIds]));

      // 5. Récupérer les informations des utilisateurs selon leur id
      const userFetches = allUserIds.map(uid =>
        fetch(`http://localhost:5000/users/${uid}`, { credentials: "include" })
          .then(res => res.ok ? res.json() : null)
      );
      const users = await Promise.all(userFetches);
      const map = {};
      users.forEach(user => { if (user) map[user.id] = user; });
      setUsersMap(map);
    };
    fetchAll();
  }, []);


  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Gestion de la soumission du post
  const handlePost = async () => {
    if (!inputValue.trim()) return;
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: inputValue })
      });
      if (response.ok) {
        setInputValue("");
        // Refresh posts after successful creation
        const res = await fetch("http://localhost:5000/posts");
        if (res.ok) {
          let data = await res.json();
          if (data.length && data[0].createdAt) {
            data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          setPosts(data);
        }
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-60 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
          <h2 className="font-semibold mb-4">Your last conersations</h2>
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
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center overflow-hidden bg-white">
                    <img
                      src={otherUser && otherUser.picture_url ? otherUser.picture_url : userAvatar}
                      alt="User"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  </div>
                  <span>{otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Unknown"}</span>
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="flex-1 p-6 overflow-hidden bg-blue-400 flex flex-col">
          <h1 className="text-white font-bold text-xl md:text-2xl mb-6 text-center">
            Welcome back {userFirstName || "User"}
          </h1>
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
          <div className="flex-1 overflow-auto px-4 md:px-24 lg:px-48 space-y-5">
            {posts.map((post) => {
              const postUser = usersMap[post.user_id];
              const postUserName = postUser ? `${postUser.first_name || ''} ${postUser.last_name || ''}`.trim() : "Unknown";
              const postUserPic = postUser && postUser.picture_url ? postUser.picture_url : userAvatar;
              const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleString() : "";
              return (
                <div key={post.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center mb-3">
                    <img src={postUserPic} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-300 mr-3" />
                    <span className="font-semibold text-gray-800">{postUserName}</span>
                  </div>
                  <h2 className="font-semibold text-lg mb-3">{post.title}</h2>
                  <p className="text-gray-700 flex-1">{post.content}</p>
                  <div className="flex justify-end mt-4">
                    <span className="text-xs text-gray-400">{createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;