import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logoImage from "../images/home.webp"; 
import userAvatar from "../images/image.webp"; 

// Dummy conversations for fallback/demo

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  // Fetch current user id on mount
  useEffect(() => {
    fetch("http://localhost:5000/users/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.id) setCurrentUserId(data.id);
      });
  }, []);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch conversations list on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("http://localhost:5000/conversations", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        } else {
          setConversations(dummyConversations);
        }
      } catch {
        setConversations(dummyConversations);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!id) {
      setMessages([]);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/messages/${id}`, { credentials: "include" })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => {
        setMessages([]);
        setLoading(false);
      });
  }, [id]);

  // Find selected conversation object
  const selectedConversation = id
    ? conversations.find((c) => String(c.id) === String(id))
    : null;

  const sendMessage = async () => {
    if (!messageText.trim() || !id) return;
    try {
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: id, content: messageText.trim() })
      });
      if (res.ok) {
        setMessageText("");
        // Refetch messages after sending
        const updated = await res.json();
        fetch(`http://localhost:5000/messages/${id}`, { credentials: "include" })
          .then(r => r.ok ? r.json() : [])
          .then(setMessages);
      }
    } catch {}
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center space-x-4">
        <Link to="/dashboard">
    <img src={logoImage} alt="Logo" className="w-12 h-12 object-cover" />
  </Link>
        </div>
        <div className="flex items-center space-x-4">
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-15">
          Disconnect
        </Link>
          <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" src={userAvatar} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Conversations sidebar */}
        <aside className="w-64 bg-white p-4 overflow-y-auto border-r border-gray-300">
          <h2 className="text-gray-900 font-semibold mb-6">Messages</h2>
          <ul>
            {conversations.length === 0 && <li className="text-gray-400">No conversations</li>}
            {conversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => navigate(`/chat/${conv.id}`)}
                className={`cursor-pointer p-3 rounded mb-3 ${
                  String(conv.id) === String(id)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-800"
                }`}
              >
                {conv.name || `Conversation #${conv.id}`}
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col bg-white">
          {!id && (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl select-none">
              Please select a conversation
            </div>
          )}

          {id && selectedConversation && (
            <>
              <header className="flex items-center p-4 border-b border-gray-200 font-semibold text-lg text-gray-900">
                Chat with {selectedConversation.name || `Conversation #${selectedConversation.id}`}
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loading ? (
                  <div className="text-gray-400">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="text-gray-400">No messages yet.</div>
                ) : (
                  messages.map((msg, idx) => {
                    const isSentByUser = currentUserId && msg.sender_id === currentUserId;
                    return (
                      <div
                        key={msg.id || idx}
                        className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs rounded-md p-3 mb-2 '
                            ${isSentByUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
                            ${isSentByUser ? 'self-end' : 'self-start'}
                          `}
                          style={{
                            borderTopRightRadius: isSentByUser ? 0 : undefined,
                            borderTopLeftRadius: !isSentByUser ? 0 : undefined,
                          }}
                        >
                          <p>{msg.content || msg.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex p-4 border-t border-gray-200"
              >
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-md"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
