import React from "react";
import { useFormHandlers } from "../useFormHandlers";

export default function Search() {

    const {
      searchTerm,
      setSearchTerm,
      setPage,
    } = useFormHandlers({
      fullname: "",
      string: "",
      caliber: "",
      tension: "",
      racket: "",
      mail: "",
      date: "",
      time: "",
      paid: false,
      notes: "",
    });
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
