import React, { useState } from "react";
import { useReclamations } from "../useReclamations.js";
import Navbar from "./Navbar";
import { PAGE_SIZE } from "../db";
import "./Reclamations.css";

export default function Reclamations() {
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
    handleEditChange,
    setSearchTerm,
    page,
    setPage,
    totalCount,
    handleApprove,
    handleDeny,
    handleStatusToggle,
  } = useReclamations({
    fullname: "",
    phone: "",
    email: "",
    model: "",
    type: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const renderStatusContent = (entry) => {
    const status = entry.status;

    if (status === "Pending" || status === false || status === "false") {
      return (
        <div className="action-buttons">
          <button onClick={() => handleApprove(entry.id)} style={{ color: "white", fontWeight: "bold", border:'1px solid #ffff' }}>
            Approve
          </button>
          <button onClick={() => handleDeny(entry.id)} style={{ color: "white", fontWeight: "bold" }}>
            Deny
          </button>
        </div>
      );
    }

    if (status === "Approved") {
      return (
        <button onClick={() => handleStatusToggle(entry.id, status)} style={{ color: "white", fontWeight: "bold", background: 'none', border: '1px solid white', cursor: 'pointer',  }}>
          Approved
        </button>
      );
    }

    if (status === "Denied") {
      return (
        <button onClick={() => handleStatusToggle(entry.id, status)} style={{ color: "white", fontWeight: "bold", background: 'none', border: '1px solid white', cursor: 'pointer' }}>
          Denied
        </button>
      );
    }

    return <span style={{ color: "gray" }}>Unknown</span>;
  };

  return (
    <>
      <Navbar />
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
            { label: "Phone", name: "phone", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Model", name: "model", type: "text" },
            { label: "Type", name: "type", type: "text" },
            { label: "Notes", name: "notes", type: "notes" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-field">
              <label>
                <h2>{label}</h2>
                {type === "notes" ? (
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
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Model</th>
                    <th>Type</th>
                    <th>Notes</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {submittedData.map((entry) => {
                    const statusStyle = {
                      backgroundColor:
                        entry.status === "Approved"
                          ? "#419b45"
                          : entry.status === "Denied"
                          ? "rgba(255, 0, 0, 0.71)"
                          : "transparent",
                    };

                    return (
                      <tr key={entry.id} style={statusStyle}>
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
                        <td data-label="Email">
                          {isEditingId === entry.id ? (
                            <input
                              name="email"
                              value={editData.email}
                              onChange={handleEditChange}
                            />
                          ) : (
                            entry.email
                          )}
                        </td>
                        <td data-label="Model">
                          {isEditingId === entry.id ? (
                            <input
                              name="model"
                              value={editData.model}
                              onChange={handleEditChange}
                            />
                          ) : (
                            entry.model
                          )}
                        </td>
                        <td data-label="Type">
                          {isEditingId === entry.id ? (
                            <input
                              name="type"
                              value={editData.type}
                              onChange={handleEditChange}
                            />
                          ) : (
                            entry.type
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
                        <td data-label="Date">{entry.date}</td>
                        <td data-label="Status">{renderStatusContent(entry)}</td>
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
                            <button onClick={() => handleEdit(entry.id)}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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


