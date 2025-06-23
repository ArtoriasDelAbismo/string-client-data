import React from "react";
import { feature } from "../features";
import { bugFix } from "../features";

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
        backgroundColor: "#dbdbdb",
        color: "black",
      }}
    >
      <div>
        <p>
          <a href="https://journadev.netlify.app/" target="_blank">
            Journadev
          </a>{" "}
          © 2025
        </p>
        <div style={{display:'flex', gap:'15px'}}>
          <div>
            <p style={{ display: "flex", gap: "5px" }}>
              <strong>Latest feature:</strong> {feature.join(" - ")}
            </p>
          </div>
          <div>
            <p style={{ display: "flex", gap: "5px" }}>
              <strong>Latest bug fix:</strong> {bugFix.join(" - ")}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
