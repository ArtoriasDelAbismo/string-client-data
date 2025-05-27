import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "110px",
        alignItems: "center",
        left: "0",
        fontSize: "small",
        backgroundColor: "#242424",
      }}
    >
      <div>
        <p>
          <a href="https://journadev.netlify.app/" target="_blank">
            Journadev
          </a>{" "}
          © 2025
        </p>
      </div>
    </footer>
  );
}
