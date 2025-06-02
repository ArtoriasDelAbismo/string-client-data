import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home(props) {

  const { isLoggedIn } = props
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);

    useEffect(() => {
    const images = [
      "/stringing-black-white.jpg",
      "/broken_racquet_20111.png"
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: imageVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          height: "100vh",
          width: "100vw",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>TB Database</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "100px" }}>
          <div>
            <Link
              onMouseEnter={() => {
                setBackgroundImage("/stringing-black-white.jpg");
                setImageVisible(true);
              }}
              onMouseLeave={() => {
                setImageVisible(false);
              }}
              style={{
                width: "100px",
                height: "50px",
                border: "1px solid",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
              to={"/strings"}
            >
              Strings
            </Link>
          </div>
          <div>
            <Link
              onMouseEnter={() => {
                setBackgroundImage("/broken_racquet_20111.png");
                setImageVisible(true);
              }}
              onMouseLeave={() => {
                setImageVisible(false);
              }}
              style={{
                width: "100px",
                height: "50px",
                border: "1px solid",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
              to={"/workshop"}
            >
              Workshop
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
