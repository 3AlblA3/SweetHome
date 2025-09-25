import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userAvatar from "../images/image.webp";

const Aside = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [userId, setUserId] = useState(null);
  const [usersMap, setUsersMap] = useState({}); 
  const [showUsersPopup, setShowUsersPopup] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch conversations and user information
    const fetchConversationsAndUsers = async () => {
      let conversationsData = [];
      let userIdLocal = null;

      // 1. Get current user
      try {
        const res = await fetch("http://localhost:5000/users/me", { credentials: "include" });
        if (res.ok) {
          const user = await res.json();
          userIdLocal = user.id;
          setUserId(userIdLocal);
        }
      } catch {}

      // 2. Get conversations
      try {
        const res = await fetch("http://localhost:5000/conversations", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          conversationsData = data;
          setConversations(data);
        }
      } catch {}

      // 3. Get user information for conversation partners
      if (userIdLocal && conversationsData.length > 0) {
        const convUserIds = conversationsData.map(conv => 
          conv.user1_id === userIdLocal ? conv.user2_id : conv.user1_id
        );
        const allUserIds = Array.from(new Set(convUserIds));

        const userFetches = allUserIds.map(uid =>
          fetch(`http://localhost:5000/users/${uid}`, { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
        );
        const users = await Promise.all(userFetches);
        const map = {};
        users.forEach(user => { if (user) map[user.id] = user; });
        setUsersMap(map);
      }
    };
    fetchConversationsAndUsers();
  }, []);


  // Fetch all users for the popup
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", { credentials: "include" });
      if (response.ok) {
        const users = await response.json();
        // Filter out the current user
        const filteredUsers = users.filter(u => u.id !== userId);
        setAllUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Handle clicking on a user to start/open conversation
  const handleUserClick = async (targetUser) => {
    try {
      const existingConv = conversations.find(conv => 
        (conv.user1_id === userId && conv.user2_id === targetUser.id) ||
        (conv.user1_id === targetUser.id && conv.user2_id === userId)
      );
      
      if (existingConv) {
        navigate(`/chat/${existingConv.id}`);
      } else {
        // Create new conversation
        const response = await fetch("http://localhost:5000/conversations", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            otherUserId: targetUser.id
          })
        });
        
        if (response.ok) {
          const newConv = await response.json();
          navigate(`/chat/${newConv.id}`);
        } else {
          alert("Failed to create conversation.");
        }
      }
    } catch (error) {
      console.error("Error handling user click:", error);
      alert("Error starting conversation.");
    }
    setShowUsersPopup(false);
  };

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-white-100 border-r border-blue-300 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
      <div className="p-4 overflow-y-auto flex-1">
        <h2 className="font-semibold mb-4">Your conversations here.</h2>
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

        {/* Plus button - now inside the scrollable area but positioned at bottom */}
        <button
          className="mt-4 mx-auto block bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            fetchAllUsers();
            setShowUsersPopup(true);
          }}
          aria-label="Show all users"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>        {/* Popup/modal */}
        {showUsersPopup && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-40 z-40" 
              onClick={() => setShowUsersPopup(false)}
              aria-hidden="true"
            />
            <div className="fixed z-50 top-1/2 left-1/2 w-80 max-h-96 overflow-auto bg-white rounded-lg shadow-lg p-4 -translate-x-1/2 -translate-y-1/2">
              <h3 className="text-lg font-semibold mb-4">All Users</h3>
              <ul className="space-y-2">
                {allUsers.map(user => (
                  <li
                    key={user.id}
                    className="flex items-center space-x-3 p-2 hover:bg-blue-100 rounded cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <img
                      src={user.picture_url || userAvatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <span>{user.first_name} {user.last_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>
  );
};

export default Aside;