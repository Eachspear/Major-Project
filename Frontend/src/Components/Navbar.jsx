import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Menu, X, User, MapPin, Settings, LogOut, Bell, Filter, RefreshCw } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allUsers, setAllUsers] = useState([
    { 
      id: 1,
      name: "Rahul Sharma", 
      location: [19.10, 72.88],
      interests: ["Photography", "Hiking"],
      status: "online",
      distance: 2.5,
      age: 25
    },
    { 
      id: 2,
      name: "Priya Verma", 
      location: [19.08, 72.85],
      interests: ["Reading", "Travel"],
      status: "online",
      distance: 3.8,
      age: 28
    },
    { 
      id: 3,
      name: "Rahul Sharma", 
      location: [19.15, 72.88],
      interests: ["Photography", "Hiking"],
      status: "online",
      distance: 2.5,
      age: 25
    },
    { 
      id: 4,
      name: "Rahul Sharma", 
      location: [19.10, 72.88],
      interests: ["Photography", "Hiking"],
      status: "online",
      distance: 2.5,
      age: 25
    }
  ]);

  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [filters, setFilters] = useState({
    maxDistance: 10,
    onlineOnly: false,
    interests: [],
    ageRange: [18, 50]
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user nearby!", isNew: true },
    { id: 2, text: "Someone liked your profile", isNew: true }
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location", error);
          alert("Failed to fetch location. Please enable location access.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const ProfileButton = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setProfileOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-all rounded-full p-2 hover:scale-105 transform cursor-pointer"
        >
          <User className="h-6 w-6 text-gray-600" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
            <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              <User className="h-4 w-4 mr-3" />
              Profile
            </a>
            <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </a>
            <a className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </a>
          </div>
        )}
      </div>
    );
  };

  const createIcon = (color) =>
    new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png`,
      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [1, -34],
      shadowSize: [45, 45],
    });

  const applyFilters = () => {
    const filtered = allUsers.filter(user => {
      const withinDistance = user.distance <= filters.maxDistance;
      const matchesOnline = !filters.onlineOnly || user.status === "online";
      const matchesInterests =
        filters.interests.length === 0 ||
        user.interests.some(interest => filters.interests.includes(interest));
      const withinAgeRange = user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1];
      return withinDistance && matchesOnline && matchesInterests && withinAgeRange;
    });
    setFilteredUsers(filtered);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = {
        id: Date.now(),
        name: "New User",
        location: [19.11, 72.86],
        interests: ["Coffee", "Movies"],
        status: "online",
        distance: 1.8,
        age: 26
      };
      setAllUsers(prev => [...prev, newUser]);
      setNotifications(prev => [{
        id: Date.now(),
        text: "New user joined nearby!",
        isNew: true
      }, ...prev]);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-2xl font-extrabold cursor-pointer hover:opacity-80 transition-opacity">
                HookieHangout
              </h1>
              <div className="hidden md:flex space-x-6">
                <a className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                  Explore
                </a>
                <Link 
                  className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                  to="/chat"
                >
                  Messages
                </Link>
                <a className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                  Events
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell 
                  className="h-6 w-6 text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors hover:scale-110 transform"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {notifications.some(n => n.isNew) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </div>
              <ProfileButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-20 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Nearby Users</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 transform active:scale-95 cursor-pointer"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>

                {filterOpen && (
                  <div className="absolute top-12 right-0 bg-white p-4 shadow-lg rounded-lg">
                    <h3 className="text-lg font-bold">Filter Users</h3>
                    <label>Max Distance: {filters.maxDistance} km</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={filters.maxDistance} 
                      onChange={(e) => setFilters({...filters, maxDistance: Number(e.target.value)})}
                    />
                    <label className="flex items-center mt-2">
                      <input 
                        type="checkbox" 
                        checked={filters.onlineOnly} 
                        onChange={(e) => setFilters({...filters, onlineOnly: e.target.checked})}
                      />
                      <span className="ml-2">Online Only</span>
                    </label>
                    <button 
  onClick={applyFilters}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
>
  Apply Filters
</button>
                  </div>
                )}

                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            {filterOpen && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 w-96">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Filter Users</h3>
                  <X 
                    className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => setFilterOpen(false)}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Distance ({filters.maxDistance}km)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={filters.maxDistance}
                      onChange={(e) => setFilters(prev => ({...prev, maxDistance: parseInt(e.target.value)}))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.onlineOnly}
                        onChange={(e) => setFilters(prev => ({...prev, onlineOnly: e.target.checked}))}
                        className="rounded text-indigo-600"
                      />
                      <span className="text-sm text-gray-700">Show only online users</span>
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyFilters}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="h-96 rounded-xl overflow-hidden shadow-inner">
              <MapContainer 
                center={[19.10, 72.88]} 
                zoom={12} 
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {filteredUsers.map((user) => (
                  <Marker key={user.id} position={user.location} icon={createIcon(user.status === "online" ? "red" : "gray")}>
                    <Popup className="rounded-lg">
                      <div className="p-2">
                        <h3 className="font-bold text-lg mb-2">{user.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-block h-2 w-2 rounded-full ${user.status === "online" ? "bg-green-400" : "bg-gray-400"}`}></span>
                          <span className="text-sm text-gray-600">{user.status}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {user.distance} km away
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-gray-200 transition-colors">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {userLocation && (
                  <Marker position={userLocation} icon={createIcon("blue")}>
                    <Popup>
                      <b>Your Location</b>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}