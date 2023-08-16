
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import Layout from "../../components/layout/Layout";

const Forgot = () => {
  
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          email,
          newPassword,
          answer,
        }
      );
      
      if (res.data.success) {
        toast.success("Login Success");
        navigate("/login"); 
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Forgot Password">
      <div className="register">
        <form
          style={{
            border: "1px solid gray",
            padding: "25px 50px 25px 40px",
            borderRadius: "8px",
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ marginBottom: "20px" }}>Reset Password</h1>
          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="enter email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              autoFocus
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="secret text"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="new Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgot;
