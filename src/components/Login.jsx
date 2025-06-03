import React, { useState } from "react";
import { supabase } from "../supaBase";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data?.user) {
      enqueueSnackbar("Login successful!", { variant: "success" }); 
      navigate("/");
    } else {
      setError("Login failed. Please try again.");
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
        <div>
          <img style={{width:'120px', marginBottom:'40px'}} src="/logoTBWorkshop.png" alt="" />
        </div>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleLogin}
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            style={{ borderRadius: "4px", height: "30px" }}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ borderRadius: "4px", height: "30px" }}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
