import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Changelog.css";

export default function Changelog() {
  const [changelog, setChangelog] = useState({ features: [], bugFixes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch("/changelog.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setChangelog(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChangelog();
  }, []);

  if (loading) return <><Navbar /><div className="changelog-container"><p>Cargando...</p></div></>;
  if (error) return <><Navbar /><div className="changelog-container"><p>Error: {error}</p></div></>;

  return (
    <>
      <Navbar />
      <div className="changelog-container">
        <h1>Novedades</h1>

        <section className="changelog-section">
          <h2>✨ Nuevas funciones</h2>
          <ul>
            {changelog.features.map((item, i) => (
              <li key={i} className="changelog-item">
                <span className="changelog-date">{item.date}</span>
                <span className="changelog-desc">{item.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="changelog-section">
          <h2>🐛 Correcciones</h2>
          <ul>
            {changelog.bugFixes.map((item, i) => (
              <li key={i} className="changelog-item">
                <span className="changelog-date">{item.date}</span>
                <span className="changelog-desc">{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
