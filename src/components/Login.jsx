import React, { useState } from "react";
import { supabase } from "../supaBase";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    setError(error.message);
  } else {
    navigate("/"); 
  }
};


  return (
    <>
      <div
        style={{
          border: "2px solid #555859",
          borderRadius: "8px",
          padding: "20px",
        boxShadow: "0 6px 16px rgba(73, 73, 73, 0.2)",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleLogin}
        >
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
          style={{borderRadius:'4px', height:'30px'}}
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
          style={{borderRadius:'4px', height:'30px'}}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
