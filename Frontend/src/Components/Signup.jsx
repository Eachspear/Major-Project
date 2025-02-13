import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

 function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show notification
    Store.addNotification({
      title: "Success!",
      message: "User signed up successfully!",
      type: "success",  // Can be 'success', 'danger', 'info', 'default'
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 500, // Auto close after 3 seconds
        onScreen: true,
      },
    });

    setTimeout(() => {
      navigate("/login"); // Redirect after showing notification
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form className="mt-6" onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl focus:ring focus:ring-indigo-300"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl focus:ring focus:ring-indigo-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl focus:ring focus:ring-indigo-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl focus:ring focus:ring-indigo-300"
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-gray-600 text-sm">
              I agree to the <Link className="text-indigo-500">Terms and Conditions</Link>
            </label>
          </div>
          <button className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
  Sign Up
</button>


        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-indigo-500">Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
