import React from "react";
import "./Metrics.css";
import { GiTennisRacket } from "react-icons/gi"

const Metrics = ({
  totalCount,
  unpaidCount,
  mostUsedTension,
  mostUsedCaliber,
  mostUsedString,
  mostUsedRacket,
}) => {
  return (
    <div className="metrics-container">
      <div className="metric-card">
        <div className="metric-icon">
          <i className="fa-solid fa-database"></i>
        </div>
        <div className="metric-info">
          <p className="metric-title">Total Entries</p>
          <p className="metric-value">{totalCount}</p>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">
          <i className="fa-solid fa-file-invoice-dollar"></i>
        </div>
        <div className="metric-info">
          <p className="metric-title">Unpaid Entries</p>
          <p className="metric-value">{unpaidCount}</p>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">
          <i className="fa-solid fa-ruler-vertical"></i>
        </div>
        <div className="metric-info">
          <p className="metric-title">Most Used Tension</p>
          <p className="metric-value">{mostUsedTension}</p>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">
          <i className="fa-solid fa-ruler-horizontal"></i>
        </div>
        <div className="metric-info">
          <p className="metric-title">Most Used Caliber</p>
          <p className="metric-value">{mostUsedCaliber}</p>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">
          <i className="fa-solid fa-tape"></i>
        </div>
        <div className="metric-info">
          <p className="metric-title">Most Used String</p>
          <p className="metric-value">{mostUsedString}</p>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">
          <GiTennisRacket />
        </div>
        <div className="metric-info">
          <p className="metric-title">Most Used Racket</p>
          <p className="metric-value">{mostUsedRacket}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
