import React from "react";

export default function Search({ searchTerm, setSearchTerm, setPage }) {
  return (
    <div className="search-container">
      <h3>Search Client:</h3>
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value.toLowerCase());
          setPage(1);
        }}
      />
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}
