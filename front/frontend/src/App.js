import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Sign from "./components/Sign";
import Header from "./components/Header";
import Welcome from "./components/Welcome"
import Chat from "./components/Chat"

function App() {
  return (
    <div className="App bg-brandBlue min-h-screen">
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/sign" element={<Sign/>}/>
        <Route path="/header" element={<Header/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;