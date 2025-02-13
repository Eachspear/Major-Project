import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./MapStyle.css";

// Custom Icons
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png`,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [1, -34],
    shadowSize: [45, 45],
  });

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
function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
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
  }, []);

  return (
    <div className="map-wrapper">
      <Navbar />
      <div className="map-container">
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
      </div>
    </div>
  );
}
