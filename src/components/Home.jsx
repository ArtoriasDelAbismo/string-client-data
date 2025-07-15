import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";

const links = [
  { to: "/strings", text: "Strings", image: "/stringing-black-white.jpg" },
  { to: "/workshop", text: "Workshop", image: "/broken_racquet_20111.png" },
];

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    // Preload images
    links.forEach((link) => {
      const img = new Image();
      img.src = link.image;
    });
  }, []);

  return (
    <>
      <Navbar />

      <div
        className={`home-background ${imageVisible ? "visible" : ""}`}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        }}
      />

      <div className="home-content">
        <h1 style={{color: '#fef000'}}>TB Database</h1>
        <div className="home-links">
          {links.map((link) => (
            <div key={link.to}>
              <Link
                className="home-link"
                to={link.to}
                onMouseEnter={() => {
                  setBackgroundImage(link.image);
                  setImageVisible(true);
                }}
                onMouseLeave={() => {
                  setImageVisible(false);
                }}
              >
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
