import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Store } from "react-notifications-component";

import "react-notifications-component/dist/theme.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    Store.addNotification({
      title: "Login Successful!",
      message: "You have successfully logged in.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 500,
        onScreen: true,
      },
    });
    

    setTimeout(() => {
      navigate("/navbar");
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Log In</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
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
          <button className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
  Log In
</button>

        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-indigo-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login; 

