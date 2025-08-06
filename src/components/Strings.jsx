import React, { useState } from "react";
import { useFormHandlers } from "../useFormHandlers.jsx";
import Navbar from "./Navbar";
import Metrics from "./Metrics";
import { caliberOptions, tensionOptions } from "../data";
import { PAGE_SIZE } from "../db";
import "./Strings.css";

export default function Strings() {
  const selectFields = {
    caliber: caliberOptions,
    tension: tensionOptions,
  };

  const {
    formData,
    submittedData,
    searchTerm,
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
    setSearchTerm,
    page,
    setPage,
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
        <form
          className="strings-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "String", name: "string", type: "text" },
            { label: "Caliber", name: "caliber", type: "text" },
            { label: "Tension", name: "tension", type: "text" },
            { label: "Racket", name: "racket", type: "text" },
            { label: "Mail", name: "mail", type: "email" },
            { label: "Notes", name: "notes", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-field">
              <label>
                <h2>{label}</h2>
                {selectFields[name] ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {selectFields[name].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "notes" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                )}
              </label>
            </div>
          ))}
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>

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
            <div className="table-container">
              <table className="responsive-table">
                <thead>
                  <tr style={{ color: "black" }}>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>String</th>
                    <th>Caliber</th>
                    <th>Tension</th>
                    <th>Racket</th>
                    <th>Mail</th>
                    {!isEditing && <th>Date</th>}
                    {!isEditing && <th>Time</th>}
                    <th>Notes</th>
                    <th>Paid</th>
                    <th>Done/Edit</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {submittedData.map((entry) => (
                    <tr
                      key={entry.id}
                      className={entry.completed ? "completed-row" : ""}
                    >
                      <td data-label="ID">{entry.id}</td>
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
                      <td data-label="String">
                        {isEditingId === entry.id ? (
                          <input
                            name="string"
                            value={editData.string}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.string
                        )}
                      </td>
                      <td data-label="Caliber">
                        {isEditingId === entry.id ? (
                          <select
                            name="caliber"
                            value={editData.caliber}
                            onChange={handleEditChange}
                            required
                          >
                            <option value="">Select caliber</option>
                            {caliberOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          entry.caliber
                        )}
                      </td>
                      <td data-label="Tension">
                        {isEditingId === entry.id ? (
                          <select
                            name="tension"
                            value={editData.tension}
                            onChange={handleEditChange}
                            required
                          >
                            <option value="">Select tension</option>
                            {tensionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          entry.tension
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
                      {!isEditing && (
                        <>
                          <td data-label="Date">{entry.date}</td>
                          <td data-label="Time">{entry.time}</td>
                        </>
                      )}
                      <td
                        data-label="Notes"
                        className={isEditingId === entry.id ? "notes-edit" : ""}
                      >
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
                      <td data-label="Paid">
                        <button
                          onClick={() => handleTogglePaid(entry.id, entry.paid)}
                          style={{
                            backgroundColor: entry.paid ? "green" : "red",
                          }}
                        >
                          {entry.paid ? "Paid" : "Unpaid"}
                        </button>
                      </td>
                      <td data-label="Actions">
                        {isEditingId === entry.id ? (
                          <div className="action-buttons">
                            <button onClick={handleUpdate}>
                              <i className="fa-solid fa-check"></i>
                            </button>
                            <button onClick={() => handleEdit(null)}>
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        ) : (
                          <div className="action-buttons">
                            {!entry.completed ? (
                              <button
                                onClick={() => {
                                  handleComplete(entry.id);
                                  handleToggleCheck(entry.id, entry.completed);
                                }}
                              >
                                <a
                                  href={`mailto:${entry.mail}?subject=Encordado&body=Hola ${entry.fullname}, tu raqueta encordada con ${entry.string} está lista para ser retirada. Te esperamos!`}
                                >
                                  <i className="fa-solid fa-check"></i>
                                </a>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleToggleCheck(entry.id, entry.completed)
                                }
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            )}
                            <button onClick={() => handleEdit(entry.id)}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  backgroundColor: "black",
                  paddingRight: "10px",
                  gap: "10px",
                }}
              ></div>
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
