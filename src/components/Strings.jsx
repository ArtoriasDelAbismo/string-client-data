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
    page,
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
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
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

          <Pagination page={page} setPage={setPage} totalCount={totalCount}/>
        </div>
      </div>
    </>
  );
}
