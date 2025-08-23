import React, { useState } from "react";
import { useFormHandlers } from "../useFormHandlers.jsx";
import Navbar from "./Navbar";
import Metrics from "./Metrics";
import { caliberOptions, tensionOptions } from "../data";
import "./Strings.css";
import Pagination from "./Pagination.jsx";
import Search from "./Search.jsx";
import StringsForm from "./StringsForm.jsx";
import StringsTable from "./StringsTable.jsx";

export default function Strings() {
  const selectFields = {
    caliber: caliberOptions,
    tension: tensionOptions,
  };

  const {
    searchTerm,
    setSearchTerm,
    setPage,
    formData,
    submittedData,
    handleChange,
    handleComplete,
    handleSubmit,
    isEditingId,
    editData,
    handleUpdate,
    handleEdit,
    handleToggleCheck,
    handleTogglePaid,
    handleEditChange,
    totalCount,
    unpaidCount,
    mostUsedTension,
    mostUsedCaliber,
    mostUsedString,
    mostUsedRacket,
    metricsLoading,
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

  const [loading, setLoading] = useState(false);
  const isEditing = isEditingId !== null;

  return (
    <>
      <Navbar />
      {metricsLoading ? (
        <div className="spinner"></div>
      ) : (
        <Metrics
          totalCount={totalCount}
          unpaidCount={unpaidCount}
          mostUsedTension={mostUsedTension}
          mostUsedCaliber={mostUsedCaliber}
          mostUsedString={mostUsedString}
          mostUsedRacket={mostUsedRacket}
        />
      )}

      <div className="strings-container">
        <StringsForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          selectFields={selectFields}
        />

        <div className="submitted-data-container">
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

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <StringsTable
              submittedData={submittedData}
              isEditingId={isEditingId}
              editData={editData}
              handleEditChange={handleEditChange}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              handleToggleCheck={handleToggleCheck}
              handleTogglePaid={handleTogglePaid}
              handleComplete={handleComplete}
              isEditing={isEditing}
            />
          )}

          <Pagination />
        </div>
      </div>
    </>
  );
}
