import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import logoImage from "../images/home.webp"; 
import userAvatar from "../images/image.webp";


const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationPartner, setConversationPartner] = useState(null);
  const [conversation, setConversation] = useState(null);

  // Fetch current user id on mount
  useEffect(() => {
    fetch("http://localhost:5000/users/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.id) setCurrentUserId(data.id);
      });
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!id) {
      setMessages([]);
      setConversation(null);
      setConversationPartner(null);
      return;
    }
    setLoading(true);
    
    // Fetch messages
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

    // Fetch conversation details to get partner info
    if (currentUserId) {
      fetch("http://localhost:5000/conversations", { credentials: "include" })
        .then(res => res.ok ? res.json() : [])
        .then(conversations => {
          const currentConv = conversations.find(conv => String(conv.id) === String(id));
          if (currentConv) {
            setConversation(currentConv);
            // Determine the other user ID
            const otherUserId = currentConv.user1_id === currentUserId ? currentConv.user2_id : currentConv.user1_id;
            
            // Fetch the other user's details
            fetch(`http://localhost:5000/users/${otherUserId}`, { credentials: "include" })
              .then(res => res.ok ? res.json() : null)
              .then(user => {
                if (user) {
                  setConversationPartner(user);
                }
              })
              .catch(() => setConversationPartner(null));
          }
        })
        .catch(() => {
          setConversation(null);
          setConversationPartner(null);
        });
    }
  }, [id, currentUserId]);

  // Find selected conversation (we'll get this from props or context later if needed)
  const selectedConversation = null; // Simplified for now since Aside handles navigation

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
      <Header />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Conversations sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)]">
          <Aside />
        </div>

        {/* Chat area */}
        <main className="flex-1 flex flex-col bg-blue-400">
          {!id && (
            <div className="flex items-center justify-center h-full text-white text-xl select-none">
              You can now start a conversation
            </div>
          )}

          {id && (
            <>
              <header className="flex items-center p-4 border-b border-gray-200 font-semibold text-lg text-gray-900">
                Chat with {conversationPartner ? `${conversationPartner.first_name} ${conversationPartner.last_name}` : `User #${id}`}
              </header>

              {/* // Loading and messages area */}
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

                        {/* // Message bubble */}
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

              {/* // Area where user can type and send new messages */}
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
                  value={messageText}  // Controlled input to ensure it clears after sending
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
