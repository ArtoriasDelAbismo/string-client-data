import React, { useState } from "react";
import { useWorkshopHandlers } from "../useWorkshopHandlers.jsx";
import Navbar from "./Navbar";
import FissureSelector from "./FissureSelector.jsx";
import "./Workshop.css";
import Pagination from "./Pagination.jsx";
import WorkshopTable from "./WorkshopTable.jsx";

const formFields = [
  { label: "Full name", name: "fullname", type: "text" },
  { label: "Mail", name: "mail", type: "email" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Racket", name: "racket", type: "text" },
  { label: "Notes", name: "notes", type: "text" },
  { label: "Service", name: "service", type: "text" },
];

export default function Workshop() {
  const {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    editData,
    handleEdit,
    handleEditChange,
    handleUpdate,
    handleChange,
    handleComplete,
    handleSubmit,
    setSearchTerm,
    handleToggleCheck,
    page,
    setPage,
    totalCount,
  } = useWorkshopHandlers({
    lastName: "",
    fullname: "",
    service: "",
    fissureSite: "",
    mail: "",
    phone: "",
    racket: "",
    notes: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [showFissureSelector, setShowFissureSelector] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const isEditing = isEditingId !== null;

  return (
    <>
      <Navbar />
      <div className="workshop-container">
        <form
          className="workshop-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {formFields.map(({ label, name, type }) => (
            <div key={name} className="form-field">
              <label>
                <h2>{label}</h2>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          ))}
          <div className="form-field">
            <h2>Fissure Site</h2>
            <button
              type="button"
              onClick={() => setShowFissureSelector(true)}
              className="fissure-selector-button"
            >
              Choose Fissure Site
            </button>
            {formData.fissureSite && (
              <div>
                <img
                  src={formData.fissureSite}
                  alt="Selected fissure site"
                  className="selected-fissure-image"
                />
              </div>
            )}
          </div>

          <div className="submit-button-container">
            <button type="submit">Submit</button>
          </div>
        </form>

        {showFissureSelector && (
          <FissureSelector
            onClose={() => setShowFissureSelector(false)}
            onSelect={handleChange}
            selectedValue={formData.fissureSite}
          />
        )}

        <div className="submitted-data-container">
          <div className="search-container">
          <h3>Submitted Workshop Entries:</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value.toLowerCase());
                setPage(1);
              }}
              className="search-input"
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <WorkshopTable submittedData={submittedData} editData={editData} handleEdit={handleEdit} handleComplete={handleComplete} handleEditChange={handleEditChange} handleToggleCheck={handleToggleCheck} handleUpdate={handleUpdate} page={page} totalCount={totalCount} isEditing={isEditing} setModalImage={setModalImage}/>
)}

          {modalImage && (
            <div className="image-modal" onClick={() => setModalImage(null)}>
              <img
                src={modalImage}
                alt="Fissure Site"
                className="modal-content-image"
              />
            </div>
          )}

          <Pagination />
        </div>
      </div>
    </>
  );
}
