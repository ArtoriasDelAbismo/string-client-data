import React from "react";
import "./FissureSelector.css";

const fissureImages = [
  { label: "0", url: "/repair-places/0.png" },
  { label: "1", url: "/repair-places/1.png" },
  { label: "2", url: "/repair-places/2.png" },
  { label: "3", url: "/repair-places/3.png" },
  { label: "4", url: "/repair-places/4.png" },
  { label: "5", url: "/repair-places/5.png" },
  { label: "6", url: "/repair-places/6.png" },
  { label: "cap", url: "/repair-places/cap.png" },
  { label: "grip", url: "/repair-places/grip.png" },
  { label: "heart-bottom", url: "/repair-places/heart-bottom.png" },
  { label: "heart1", url: "/repair-places/heart1.png" },
  { label: "heart2", url: "/repair-places/heart2.png" },
];

export default function FissureSelector({
  onClose,
  onSelect,
  selectedValue,
}) {
  return (
    <div className="fissure-selector-modal">
      <div className="fissure-selector-content">
        {fissureImages.map((img) => (
          <div key={img.label} className="fissure-image-container">
            <p className="fissure-image-label">{img.label}</p>
            <img
              src={img.url}
              alt={img.label}
              onClick={() => {
                onSelect({
                  target: { name: "fissureSite", value: img.url },
                });
                onClose();
              }}
              className={`fissure-image ${
                selectedValue === img.url ? "selected" : ""
              }`}
            />
          </div>
        ))}
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}
