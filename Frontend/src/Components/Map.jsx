import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
<<<<<<< HEAD
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
>>>>>>> location
import axios from "axios";
import Navbar from "./Navbar";
import "./MapStyle.css";

<<<<<<< HEAD
// Custom Icons
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png`,
=======


const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
>>>>>>> location
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [1, -34],
    shadowSize: [45, 45],
  });

<<<<<<< HEAD
// User's Custom Location Icon
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [45, 45],
});

// Component to center the map when userLocation is set
=======
// User's Location Marker (Blue)
const userIcon = createIcon("blue");
const nearbyIcon = createIcon("red");

// Map auto-centering component
>>>>>>> location
function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
<<<<<<< HEAD
      map.setView(coords, 13);
=======
      map.setView(coords, 12);
>>>>>>> location
    }
  }, [coords, map]);
  return null;
}

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
<<<<<<< HEAD
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Function to update user's location in the backend
  const updateUserLocation = async (latitude, longitude) => {
    try {
      await axios.post("http://localhost:5000/api/update-location", {
        latitude,
        longitude,
      });
      console.log("Location updated successfully");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  // Function to fetch nearby users from the backend
  const fetchNearbyUsers = async (latitude, longitude) => {
    try {
      const response = await axios.get("http://localhost:5000/api/nearby-users", {
        params: {
          latitude,
          longitude,
          maxDistance: 10000, // 10 km radius
        },
      });

      setFilteredUsers(response.data.users);
      console.log("Nearby Users:", response.data.users);
    } catch (error) {
      console.error("Error fetching nearby users:", error);
    }
  };

  // Get user's current location and fetch data
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = [latitude, longitude];
        setCurrentLocation(newLocation);

        // Update backend with user's location
        updateUserLocation(latitude, longitude);

        // Fetch nearby users
        fetchNearbyUsers(latitude, longitude);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
=======
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  
  

  // Function to update only the current user's location in the backend
  const updateUserLocation = async (latitude, longitude) => {
    try {
      await axios.post(
        "http://localhost:8500/location/update",
        { latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("User location updated.");
    } catch (error) {
      console.error("Failed to update user location:", error);
    }
  };

  // Function to fetch nearby users **without modifying their locations**
  const fetchNearbyUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8500/location/nearby", {
        params: { maxDistance: 1000 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("API Response:", response.data);

      // Extract user data properly
      const validUsers =
        response.data?.users
          ?.filter((user) => user?.latitude && user?.longitude && user?.user?.UserName)
          .map((user) => ({
            ...user,
            location: {
              lat: user.latitude,
              lng: user.longitude,
            },
            userName: user.user.UserName, // ✅ Extract username properly
            displayName: user.user.name, // ✅ Extract full name if needed
          })) || [];

      setNearbyUsers(validUsers);

      // Log extracted usernames
      console.log("Nearby Usernames:", validUsers.map((u) => u.userName));
    } catch (error) {
      console.error("Error fetching nearby users:", error.response?.data || error.message);
    }
  };

  // Fetch user's location and update backend **only once**
  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
          setLoading(false);

          console.log(latitude, longitude);

          // Update backend **only for the user**
          await updateUserLocation(latitude, longitude);

          // Fetch nearby users **without modifying them**
          await fetchNearbyUsers();
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Location access denied. Please enable GPS.");
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    };

    getUserLocation();
>>>>>>> location
  }, []);

  return (
    <div className="map-wrapper">
      <Navbar />
      <div className="map-container">
<<<<<<< HEAD
        <MapContainer center={currentLocation || [19.10, 72.88]} zoom={12} className="map-box">
          <ChangeMapView coords={currentLocation} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Current Location Marker */}
          {currentLocation && (
            <Marker position={currentLocation} icon={userIcon}>
              <Popup><b>Your Location</b></Popup>
            </Marker>
          )}

          {/* Nearby Users Markers */}
          {filteredUsers.map((user) => (
            <Marker
              key={user.id}
              position={user.location}
              icon={createIcon(user.status === "online" ? "red" : "gray")}
            >
              <Popup>
                <h3 className="popup-title">{user.name}</h3>
                <span className={`status-dot ${user.status}`}></span> {user.status}
                <p className="popup-text">{user.distance} km away</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
=======
        {loading ? (
          <p className="loading-text">Fetching your location...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <MapContainer center={currentLocation} zoom={12} className="map-box">
            <ChangeMapView coords={currentLocation} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User's Current Location Marker */}
            {currentLocation && (
              <Marker position={currentLocation} icon={userIcon}>
                <Popup>
                  <h3 className="popup-title">{"You"}</h3>
                  <b>Your Location</b>
                </Popup>
              </Marker>
            )}

            {/* Nearby Users Markers */}
            {nearbyUsers.map((user, index) => (
              <Marker
                key={user.userId || index}
                position={[user.location.lat, user.location.lng]}
                icon={nearbyIcon}
              >
                <Popup>
                  <h3 className="popup-title">{user.userName || "Unknown User"}</h3>
                  <p className="popup-text">{user.distanceInKm?.toFixed(2) || "N/A"} km away</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
>>>>>>> location
      </div>
    </div>
  );
}
