import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        fontSize: "small",
        zIndex:'2',
        backgroundColor:'#242424'
      }}
    >
      <nav style={{ display: "flex", height: "76px" }}>
        <div style={{ display: "flex", alignSelf: "center", padding: "20px" }}>
          <img style={{ width: "150px" }} src="/logoTBWorkshop.png" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "end" }}>
          <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
            <Link to={"/"}>Home</Link>
            <Link to={"/Strings"}>Strings</Link>
            <Link to={"/Workshop"}>Workshop</Link>
            <li>
              <a
                href="https://tierrabatida.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </li>
            <li>
              <a
                href="https://tierrabatida.com.ar/"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Smart Manager
              </a>
            </li>{" "}
          </ul>
        </div>
        <p style={{ position: "absolute", top: "0", right: "9px", color:'#555959' }}>
          v {__APP_VERSION__}
        </p>
      </nav>
    </header>
  );
}
