import React, { useState } from "react";
import logoImage from "../images/home.webp"; 
import userAvatar from "../images/image.webp"; 

const dummyConversations = [
  {
    id: 1,
    name: "Alice",
    messages: [
      { from: "Alice", text: "Hi there!" },
      { from: "You", text: "Hello Alice!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    messages: [
      { from: "Bob", text: "Hey!" },
      { from: "You", text: "Hey Bob, what's up?" },
    ],
  },
];

const Chat = () => {
  const [conversations, setConversations] = useState(dummyConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messageText, setMessageText] = useState("");

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return;

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === selectedConversationId) {
        return {
          ...conversation,
          messages: [
            ...conversation.messages,
            { from: "You", text: messageText.trim() },
          ],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setMessageText("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-15 rounded-full bg-blue-200 overflow-hidden flex items-center justify-center">
            <img src={logoImage} alt="Logo" className="w-10 h-10 object-cover" />
          </div>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Disconnect
          </button>
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
            {conversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`cursor-pointer p-3 rounded mb-3 ${
                  conv.id === selectedConversationId
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-800"
                }`}
              >
                {conv.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col bg-white">
          {!selectedConversation && (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl select-none">
              Please select a conversation
            </div>
          )}

          {selectedConversation && (
            <>
              <header className="flex items-center p-4 border-b border-gray-200 font-semibold text-lg text-gray-900">
                Chat with {selectedConversation.name}
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConversation.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-xs rounded-md p-3 ${
                      msg.from === "You"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-800 self-start"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                ))}
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
