import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8500/user/login", {
        email: formData.email,
        password: formData.password
      });

<<<<<<< HEAD
    setTimeout(() => {
      navigate("/map");
    }, 500);
=======
      if (response.status === 200) {
        // Optional: Save auth token if your backend sends one
        // localStorage.setItem('token', response.data.token);
        localStorage.setItem("token", response.data.token); 
        console.log("Token stored:", localStorage.getItem("token"));
        
        Store.addNotification({
          title: "Login Successful!",
          message: "Welcome back!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });

        setTimeout(() => {
          navigate("/map");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      
      Store.addNotification({
        title: "Login Failed",
        message: error.response?.data?.error || "Invalid email or password",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } finally {
      setIsLoading(false);
    }
>>>>>>> location
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
<<<<<<< HEAD
          <button className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
  Log In
=======
         <button
  type="submit"
  disabled={isLoading}
  className={`w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold transition cursor-pointer
    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
>
  {isLoading ? (
    <span className="flex justify-center items-center">
      <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Logging in...
    </span>
  ) : (
    'Log In'
  )}
>>>>>>> location
</button>

        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-indigo-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Login; 

=======
export default Login;
>>>>>>> location
