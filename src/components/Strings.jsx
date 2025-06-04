import React, { useEffect, useState } from "react";
import { useFormHandlers } from "../useFormHandlers";
import { fetchEntry } from "../db";
import Navbar from "./Navbar";
import { caliberOptions } from "../data";

export default function Strings() {
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
    handleEditChange,
    setNextId,
    setSearchTerm,
    setSubmittedData,
  } = useFormHandlers({
    name: "",
    lastName: "",
    string: "",
    caliber: "",
    tension: "",
    racket: "",
    mail: "",
    date: "",
    time: "",
  });

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const results = await fetchEntry(searchTerm, page);

      const sanitizedResults = results.map((entry) => ({
        ...entry,
        completed: entry.completed ?? false,
      }));

      setSubmittedData(sanitizedResults);

      const maxId = sanitizedResults.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      setNextId(maxId + 1);
      setLoading(false);
    };
    fetchFilteredData();
  }, [searchTerm, page]);

  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const isEditing = isEditingId !== null;

  return (
    <>
      <Navbar />
      <form
        style={{ marginTop: "100px" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "String", name: "string", type: "text" },
            { label: "Caliber", name: "caliber", type: "text" },
            { label: "Tension", name: "tension", type: "text" },
            { label: "Racket", name: "racket", type: "text" },
            { label: "Mail", name: "mail", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label>
                <h2>{label}</h2>
                {name === "caliber" ? (
        <select
          name="caliber"
          value={formData.caliber}
          onChange={handleChange}
          style={{
            width: "100%",
            maxWidth: "140px",
            boxSizing: "border-box",
            fontSize: "14px",
          }}
          required
        >
          <option value="">Select</option>
          {caliberOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    maxWidth: "140px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />)}
              </label>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: "74px" }}>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "1200px",
        }}
      >
        <h3>Submitted Data:</h3>
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            style={{
              height: "35px",
              borderRadius: "4px",
            }}
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
          <div
            className="table-container"
            style={{ overflowX: "auto", maxWidth: "100%" }}
          >
            <table
              className="responsive-table"
              style={{
                minWidth: "1200px",
                width: "100%",
              }}
            >
              <thead style={{ color: "black" }}>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Last Name</th>
                  <th style={thStyle}>String</th>
                  <th style={thStyle}>Caliber</th>
                  <th style={thStyle}>Tension</th>
                  <th style={thStyle}>Racket</th>
                  <th style={thStyle}>Mail</th>
                  {!isEditing && <th style={thStyle}>Date</th>}
                  {!isEditing && <th style={thStyle}>Time</th>}
                  <th style={thStyle}>Done/Edit</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {submittedData.map((entry) => (
                  <tr
                    key={entry.id}
                    style={{
                      backgroundColor: entry.completed
                        ? "#419b45"
                        : "transparent",
                    }}
                  >
                    <td style={tdStyle}>{entry.id}</td>
                    <td style={tdStyle}>
                      {isEditingId === entry.id ? (
                        <input
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        entry.name
                      )}
                    </td>
                    <td style={tdStyle}>
                      {isEditingId === entry.id ? (
                        <input
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleEditChange}
                        />
                      ) : (
                        entry.lastName
                      )}
                    </td>
                    <td style={tdStyle}>
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
                    <td style={tdStyle}>
                      {isEditingId === entry.id ? (
<div key="caliber">
  <label>
    <select
      name="caliber"
      value={formData.caliber}
      onChange={handleChange}
      style={{ width: "140px", fontSize: "14px" }}
      required
    >
      <option value="">Select caliber</option>
      {caliberOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
</div>

                      ) : (
                        entry.caliber
                      )}
                    </td>
                    <td style={tdStyle}>
                      {isEditingId === entry.id ? (
                        <input
                          name="tension"
                          value={editData.tension}
                          onChange={handleEditChange}
                        />
                      ) : (
                        entry.tension
                      )}
                    </td>
                    <td style={tdStyle}>
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
                    <td style={tdStyle}>
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
                        <td style={tdStyle}>{entry.date}</td>
                        <td style={tdStyle}>{entry.time}</td>
                      </>
                    )}

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {isEditingId === entry.id ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                            minWidth: "200px",
                          }}
                        >
                          <button onClick={handleUpdate}>
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button onClick={() => handleEdit(null)}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: "2px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={() =>
                              handleToggleCheck(entry.id, entry.completed)
                            }
                          >
                            {entry.completed ? (
                              <i className="fa-solid fa-xmark"></i>
                            ) : (
                              <i className="fa-solid fa-check"></i>
                            )}
                          </button>
                          <button>
                            <a
                              href={`mailto:${entry.mail}?subject=Encordado&body=Hola ${entry.name}, tu raqueta encordada con ${entry.string} está lista para ser retirada.`}
                              onClick={() => handleComplete(entry.id)}
                              style={{
                                pointerEvents: !entry.completed
                                  ? "none"
                                  : "auto",
                                opacity: !entry.completed ? 0.5 : 1,
                              }}
                            >
                              <i className="fa-solid fa-envelope"></i>
                            </a>
                          </button>
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
          </div>
        )}

        {/* Pagination */}
        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={submittedData.length < 5}
          >
            Next ➡
          </button>
        </div>
      </div>
    </>
  );
}
