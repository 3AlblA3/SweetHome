import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImage from "../images/home.webp";
import userAvatar from "../images/image.webp";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);

  // Récupère la photo de profil de l'utilisateur connecté
  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const res = await fetch("http://localhost:5000/users/me", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.id) {
          const response = await fetch(`http://localhost:5000/users/${data.id}`, { credentials: "include" });
          if (!response.ok) return;
          const user = await response.json();
          setProfilePic(user && user.picture_url ? user.picture_url : null);
        }
      } catch (err) {
        setProfilePic(null);
      }
    };
    fetchProfilePic();
  }, []);

  // Déconnexion
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

  //Gestion du menu déroulant 
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <img src={logoImage} alt="Logo" className="ml-4 md:ml-15 w-10 md:w-12 h-10 md:h-12 object-cover" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded mr-4 md:mr-15 text-sm md:text-base"
        >
          Disconnect
        </button>
        <div className="relative" ref={menuRef}>
          <button
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="User menu"
          >
            <img alt="User Avatar" src={profilePic || userAvatar} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/profile/modify_profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Modify Profile
              </Link>
              <Link
                to="/profile/modify_password"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Modify Password
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
