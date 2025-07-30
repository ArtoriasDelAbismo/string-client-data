import React, { useState, useEffect } from "react";
import "./Footer.css";
import Changelog from "./Changelog";
import { Link } from "react-router-dom";

export default function Footer() {
  const [changelog, setChangelog] = useState({ features: [], bugFixes: [] });

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch("/changelog.json");
        const data = await response.json();
        // Get the latest feature and bug fix
        const latestFeature = data.features.length > 0 ? [data.features[0]] : [];
        const latestBugFix = data.bugFixes.length > 0 ? [data.bugFixes[0]] : [];
        setChangelog({ features: latestFeature, bugFixes: latestBugFix });
      } catch (e) {
        console.error("Failed to fetch changelog for footer:", e);
      }
    };

    fetchChangelog();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>Latest Changes:</p>
          <Link to={'./Changelog'}>Changelog</Link>
        </div>
      </div>

      <div className="footer-social">
        <a
          href="https://github.com/ArtoriasDelAbismo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>

      <div className="footer-bottom">
        <p>
          <a
            href="https://journadev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Journadev
          </a>{" "}
          © 2025
        </p>
      </div>
    </footer>
  );
}

