import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";

import {
  FaTachometerAlt,
  FaWrench,
  FaExclamationCircle,
} from "react-icons/fa";
import { GiTennisRacket } from "react-icons/gi";

export default function Home() {
  const dashboardItems = [
    {
      to: "/Strings",
      icon: <FaTachometerAlt className="dashboard-icon" />,
      title: "Strings",
      
      description: "Manage clients and stringing jobs.",
    },
    {
      to: "/workshop",
      icon: <FaWrench className="dashboard-icon" />,
      title: "Workshop",
      description: "keep track of reparations.",
    },
    {
      to: "/reclamations",
      icon: <FaExclamationCircle className="dashboard-icon" />,
      title: "Reclamations",
      description: "Handle customer claims and issues.",
    },
    {
      to: "/demos",
      icon: <GiTennisRacket className="dashboard-icon" />,
      title: "Demos",
      description: "View and manage demo racquets.",
    },
    ];

  return (
<div>
      <Navbar />

      <div className="home-dashboard-container">
        <header className="home-dashboard-header">
          <h1>Tb Services Database</h1>
          <p>Manage all our data and services.</p>
        </header>
        <main className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <Link to={item.to} key={index} className="dashboard-card-link">
              <div className="dashboard-card">
                {item.icon}
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}