import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Changelog.css";

export default function Changelog() {
  const [changelog, setChangelog] = useState({ features: [], bugFixes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawJson, setRawJson] = useState(null)

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch("/changelog.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        setRawJson(data)
        setChangelog(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="changelog-container">
          <h1>Changelog</h1>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="changelog-container">
          <h1>Changelog</h1>
          <p>Error loading changelog: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="changelog-container">
        <pre>
          <code style={{display:'flex', textAlign:'start'}}>{rawJson}</code>
        </pre>
      </div>
    </>
  );
}
