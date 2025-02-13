import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Settings, LogOut, Bell } from "lucide-react";
import React from "react";

export default function Navbar({ notifications = [] }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 border-b border-gray-300 py-3 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-2xl font-extrabold cursor-pointer hover:opacity-80">
          HookieHangout
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link className="text-gray-700 hover:text-indigo-600 font-medium transition-colors" to="/map">
            Explore
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 font-medium transition-colors" to="/chat">
            Messages
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 font-medium transition-colors" to="/login">
            Events
          </Link>
        </div>

        {/* Notification and Profile Icons */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
              onClick={() => setNotificationOpen((prev) => !prev)}
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications?.length > 0 && notifications.some((n) => n.isNew) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dropdown-menu">
                <div className="p-4 text-sm font-medium text-gray-700">Notifications</div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <span className="flex-1">{notification.message}</span>
                      {notification.isNew && (
                        <span className="w-2 h-2 bg-red-600 rounded-full ml-2" />
                      )}
                    </div>
                  ))}
                </div>
                {notifications.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                )}
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <ProfileButton profileOpen={profileOpen} setProfileOpen={setProfileOpen} profileRef={profileRef} />
        </div>
      </div>
    </nav>
  );
}

function ProfileButton({ profileOpen, setProfileOpen, profileRef }) {
  return (
    <div className="relative" ref={profileRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
        onClick={() => setProfileOpen((prev) => !prev)}
      >
        <User className="h-6 w-6 text-gray-600" />
      </button>

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dropdown-menu">
          <Link
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            to="/profile"
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </Link>
          <Link
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            to="/settings"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Link>
          <Link
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            to="/logout"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
