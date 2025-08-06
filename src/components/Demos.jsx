import React, { useState } from "react";
import { useDemosHandlers } from "../useDemosHandlers.js";
import Navbar from "./Navbar";
import { caliberOptions, tensionOptions, demosOptions } from "../data";
import { PAGE_SIZE } from "../db";
import "./Demos.css";

export default function Demos() {
  const selectFields = {
    caliber: caliberOptions,
    tension: tensionOptions,
    demos: demosOptions,
  };

  const {
    formData,
    submittedData,
    searchTerm,
    handleChange,
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
    loading,
  } = useDemosHandlers({
    fullname: "",
    mail: "",
    phone: "",
    demo: "",
    date: "",
    time: "",
    notes: "",
    paid: false,
  });

  return (
    <>
      <Navbar />

      <div className="demos-container">
        <form className="demos-form" onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Mail", name: "mail", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
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
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              alignItems:'center',
              alignContent:'center',
              flexDirection: "column",

            }}
          >
            <label style={{marginBottom:'2px'}} htmlFor="select">Demo</label>
            <select
              name="demo"
              id="demos"
              style={{ height: "40px" }}
              onChange={handleChange}
              value={formData.demo}
              required
            >
              <option value="" disabled>
                Select a demo
              </option>
              {demosOptions.map((brandData) => (
                <optgroup key={brandData.brand} label={brandData.brand}>
                  {brandData.models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="conditions-container">
          <h2>Conditions
            
          </h2>
          <ul>
            <li>
              <b>Demo Cost:</b> $10,000 per demo.
            </li>
            <li>
              <b>Testing Period:</b> 3 days.
            </li>
            <li>
              <b>Late Fee:</b> An additional $5,000 will be charged for each day
              past the initial 3 days.
            </li>
            <li>
              <b>Purchase Discount:</b> The rental fee will be discounted from
              the final price if the client purchases the racket.
            </li>
            <li>
              <b>Non-refundable:</b> The rental fee is not refundable if the
              client does not purchase the racket.
            </li>
          </ul>
        </div>

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
                    <th>Mail</th>
                    <th>Phone</th>
                    <th>Demo</th>
                    {isEditingId === null && <th>Date</th>}
                    {isEditingId === null && <th>Time</th>}
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
                      <td data-label="Demo">
                        {isEditingId === entry.id ? (
                          <input
                            name="demo"
                            value={editData.demo}
                            onChange={handleEditChange}
                          />
                        ) : (
                          entry.demo
                        )}
                      </td>

                      {isEditingId === null && (
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
                                  handleToggleCheck(entry.id, entry.completed);
                                }}
                              >
                                <a
                                  href={`mailto:${entry.mail}?subject=Demo&body=Hola ${entry.fullname}, tu raqueta demo ${entry.demo} está lista para ser retirada. Te esperamos!`}
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
