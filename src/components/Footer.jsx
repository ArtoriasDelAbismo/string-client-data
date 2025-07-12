import React from "react";
import { feature } from "../features";
import { bugFix } from "../features";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>
            <strong>Latest feature:</strong> {feature.join(" - ")}
          </p>
        </div>
        <div className="footer-section">
          <p>
            <strong>Latest bug fix:</strong> {bugFix.join(" - ")}
          </p>
        </div>
      </div>

      <div className="footer-social">
        <a href="https://github.com/ArtoriasDelAbismo" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>

      <div className="footer-bottom">
        <p>
          <a href="https://journadev.netlify.app/" target="_blank" rel="noopener noreferrer">
            Journadev
          </a>{" "}
          © 2025
        </p>
      </div>
    </footer>
  );
}
