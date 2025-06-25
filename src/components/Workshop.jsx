import React, { useEffect, useState } from "react";
import { useWorkshopHandlers } from "../useWorkshopHandlers";
import { fetchWorkshopEntry } from "../db";
import Navbar from "./Navbar";

export default function Workshop() {
  const {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    setIsEditingId,
    editData,
    setEditData,
    handleEdit,
    handleEditChange,
    handleUpdate,
    handleChange,
    handleComplete,
    handleDelete,
    handleSubmit,
    setSearchTerm,
    setSubmittedData,
    handleToggleCheck,
  } = useWorkshopHandlers({
    name: "",
    lastName: "",
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

  const fissureImages = [
    { label: "0", url: "/repair-places/0.png" },
    { label: "1", url: "/repair-places/1.png" },
    { label: "2", url: "/repair-places/2.png" },
    { label: "3", url: "/repair-places/3.png" },
    { label: "4", url: "/repair-places/4.png" },
    { label: "5", url: "/repair-places/5.png" },
    { label: "6", url: "/repair-places/6.png" },
    { label: "cap", url: "/repair-places/cap.png" },
    { label: "grip", url: "/repair-places/grip.png" },
    { label: "heart-bottom", url: "/repair-places/heart-bottom.png" },
    { label: "heart1", url: "/repair-places/heart1.png" },
    { label: "heart2", url: "/repair-places/heart2.png" },
  ];

  const [page, setPage] = useState(1);
  const [showFissureSelector, setShowFissureSelector] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const results = await fetchWorkshopEntry(searchTerm, page);
      setSubmittedData(results);
      setLoading(false);
    };
    fetchFilteredData();
  }, [searchTerm, page]);

  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
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
            { label: "Mail", name: "mail", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Racket", name: "racket", type: "text" },
            { label: "Notes", name: "notes", type: "text" },
            { label: "Service", name: "service", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label>
                <h2>{label}</h2>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />
              </label>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <h2>Fissure Site</h2>
            <button
              type="button"
              onClick={() => setShowFissureSelector(true)}
              style={{ marginBottom: "10px" }}
            >
              Choose Fissure Site
            </button>
            {formData.fissureSite && (
              <div>
                <img
                  src={formData.fissureSite}
                  alt="Selected fissure site"
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "74px" }}>
            <button type="submit">Submit</button>
          </div>
        </div>
        {showFissureSelector && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                maxWidth: "680px",
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {fissureImages.map((img) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    {img.label}
                  </p>
                  <img
                    className="image-selector-img"
                    key={img.label}
                    src={img.url}
                    alt={img.label}
                    onClick={() => {
                      handleChange({
                        target: {
                          name: "fissureSite",
                          value: img.url,
                        },
                      });
                      setShowFissureSelector(false);
                    }}
                    style={{
                      width: "100px",
                      cursor: "pointer",
                      border:
                        formData.fissureSite === img.url
                          ? "3px solid green"
                          : "2px solid transparent",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() => setShowFissureSelector(false)}
                style={{ marginTop: "10px", width: "100%" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Submitted Workshop Entries:</h3>
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
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1000px",
            }}
          >
            <thead style={{ color: "black" }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Mail</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Racket</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Fissure Site</th>
                <th style={thStyle}>Notes</th>
                {!isEditingId && <th style={thStyle}>Date</th>}
                {!isEditingId && <th style={thStyle}>Time</th>}
                <th style={thStyle}>Done/Edit</th>
              </tr>
            </thead>
            <tbody className="table-body" >
              {submittedData.map((entry) => (
                <tr
                  key={entry.id}
                  style={{
                    backgroundColor: entry.completed
                      ? "#419b45"
                      : "transparent",
                    fontSize: "small",
                  }}
                >
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
                        name="mail"
                        value={editData.mail}
                        onChange={handleEditChange}
                      />
                    ) : (
                      entry.mail
                    )}
                  </td>
                  <td style={tdStyle}>
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
                        name="service"
                        value={editData.service}
                        onChange={handleEditChange}
                      />
                    ) : (
                      entry.service
                    )}
                  </td>
                  <td style={tdStyle}>
                    {entry.fissureSite && (
                      <img
                        src={entry.fissureSite}
                        alt="Fissure site"
                        style={{
                          width: "60px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => setModalImage(entry.fissureSite)}
                      />
                    )}
                  </td>
                  <td style={tdStyle}>
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
                      <td style={tdStyle}>{entry.date}</td>
                      <td style={tdStyle}>{entry.time}</td>
                    </>
                  )}
                  <td
                    style={{
                      tdStyle
                    }}
                  >
                    {isEditingId === entry.id ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "2px",
                          justifyContent: "center",
                          minWidth: "110px",
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
                          {!entry.completed ? (
                            <button
                              onClick={() => {
                                handleComplete(entry.id);
                                handleToggleCheck(entry.id, entry.completed);
                              }}
                            >
                              <a
                                href={`mailto:${entry.mail}?subject=Reparación&body=Hola ${entry.name}, tu servicio de ${entry.service} está listo para ser retirado.`}
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
        )}

        {modalImage && (
          <div
            onClick={() => setModalImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              cursor: "zoom-out",
            }}
          >
            <img
              src={modalImage}
              alt="Fissure Site"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(0,0,0,0.6)",
              }}
            />
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
