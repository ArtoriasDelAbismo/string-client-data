import React, { useState } from "react";
import { useWorkshopHandlers } from "../useWorkshopHandlers.jsx";
import Navbar from "./Navbar";
import FissureSelector from "./FissureSelector.jsx";
import { PAGE_SIZE } from "../db";
import "./Workshop.css";

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
            <div className="table-container">
              <table className="responsive-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Mail</th>
                    <th>Phone</th>
                    <th>Racket</th>
                    <th>Service</th>
                    <th>Fissure Site</th>
                    <th>Notes</th>
                    {!isEditingId && <th>Date</th>}
                    {!isEditingId && <th>Time</th>}
                    <th>Done/Edit</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {submittedData.map((entry) => (
                    <tr
                      key={entry.id}
                      className={entry.completed ? "completed-row" : ""}
                    >
                      <td data-label="Full Name">
                        {isEditingId === entry.id ? (
                          <input
                            name="fullname"
                            value={editData.fullname}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.fullname
                        )}
                      </td>
                      <td data-label="Mail">
                        {isEditingId === entry.id ? (
                          <input
                            name="mail"
                            value={editData.mail}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.mail
                        )}
                      </td>
                      <td data-label="Phone">
                        {isEditingId === entry.id ? (
                          <input
                            name="phone"
                            value={editData.phone}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.phone
                        )}
                      </td>
                      <td data-label="Racket">
                        {isEditingId === entry.id ? (
                          <input
                            name="racket"
                            value={editData.racket}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.racket
                        )}
                      </td>
                      <td data-label="Service">
                        {isEditingId === entry.id ? (
                          <input
                            name="service"
                            value={editData.service}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.service
                        )}
                      </td>
                      <td data-label="Fissure Site">
                        {entry.fissureSite && (
                          <img
                            src={entry.fissureSite}
                            alt="Fissure site"
                            className="fissure-site-image"
                            onClick={() => setModalImage(entry.fissureSite)}
                          />
                        )}
                      </td>
                      <td data-label="Notes">
                        {isEditingId === entry.id ? (
                          <input
                            name="notes"
                            value={editData.notes}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.notes
                        )}
                      </td>
                      {!isEditing && (
                        <>
                          <td data-label="Date">{entry.date}</td>
                          <td data-label="Time">{entry.time}</td>
                        </>
                      )}
                      <td data-label="Actions">
                        <div className="action-buttons">
                          {isEditingId === entry.id ? (
                            <>
                              <button onClick={handleUpdate}>
                                <i className="fa-solid fa-check"></i>
                              </button>
                              <button onClick={() => handleEdit(null)}>
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              {!entry.completed ? (
                                <button
                                  onClick={() => {
                                    handleComplete(entry.id);
                                    handleToggleCheck(
                                      entry.id,
                                      entry.completed
                                    );
                                  }}
                                >
                                  <a
                                    href={`mailto:${entry.mail}?subject=Reparación&body=Hola ${entry.fullname}, tu servicio de ${entry.service} está listo para ser retirado. Te esperamos!`}
                                  >
                                    <i className="fa-solid fa-check"></i>
                                  </a>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleToggleCheck(
                                      entry.id,
                                      entry.completed
                                    )
                                  }
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </button>
                              )}
                              <button onClick={() => handleEdit(entry.id)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "end", backgroundColor:'black', paddingRight:'10px' }}>
                <p>Total workshop database entries: {totalCount}</p>
              </div>
            </div>
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

          <div className="pagination-container">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              ⬅ Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * PAGE_SIZE >= totalCount}
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
