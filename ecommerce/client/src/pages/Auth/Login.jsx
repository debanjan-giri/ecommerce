
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";


import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      
      if (res.data.success) {
        toast.success("Login Success");
        setAuth({
          ...auth, 
          token: res.data.token, 
          user: res.data.user, 
        });
        
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/"); 
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login - Ecommer App">
      <div className="register">
        <form
          style={{
            border: "1px solid gray",
            padding: "25px 50px 25px 40px",
            borderRadius: "8px",
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ marginBottom: "20px" }}>Login</h1>
          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              
              onClick={() => {
                navigate("/forgot");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
