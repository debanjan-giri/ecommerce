
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import Layout from "../../components/layout/Layout";
import "../../style/AuthStyle.css";

const Register = () => { 
  
  
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  
  const Navigate = useNavigate();

  
  async function handleSubmit(e) {
    e.preventDefault(); 
    try {
      
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/register`,
        {
          name, 
          email,
          phone,
          address,
          password,
          answer,
        }
      );
      
      if (res && res.data.success) {
        toast.success("Register Success");
        Navigate("/login");
      }
    } catch (error) {
      toast.error("Register Failed");
    }
  }

  return (
    <Layout title={"Register"}>
      <div className="register">
        <form style={{
          marginTop: "90px",
            border: "1px solid gray",
            padding: "25px 50px 25px 40px",
            borderRadius: "8px",
          }} onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="mb-3">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="secret text"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
