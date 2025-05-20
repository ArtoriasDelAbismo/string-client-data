import React, { useEffect, useState } from "react";
import { useWorkshopHandlers } from "../useWorkshopHandlers";
import { fetchWorkshopEntry } from "../db";

export default function Workshop() {
  const {
    formData,
    submittedData,
    searchTerm,
    handleChange,
    handleComplete,
    handleDelete,
    handleSubmit,
    setNextId,
    setSearchTerm,
    setSubmittedData,
    handleCheck,
  } = useWorkshopHandlers({
    name: "",
    lastName: "",
    service: "",
    fissureSite: "",
    notes: "",
    mail: "",
    phone: "",
    racket: "",
    date: "",
    time: "",
  });

  const fissureImages = [
    { label: "12", url: "/repair-places/12.png" },
    { label: "1:5", url: "/repair-places/1:5.png" },
    { label: "3", url: "/repair-places/3.png" },
    { label: "4:5", url: "/repair-places/4:5.png" },
    { label: "6", url: "/repair-places/6.png" },
    { label: "7:5", url: "/repair-places/7:5.png" },
    { label: "9", url: "/repair-places/9.png" },
    { label: "10:5", url: "/repair-places/10:5.png" },
    { label: "left-heart", url: "/repair-places/left-heart.png" },
    { label: "right-heart", url: "/repair-places/right-heart.png" },
    { label: "core-heart", url: "/repair-places/core-heart.png" },
  ];

  const [page, setPage] = useState(1);
  const [showFissureSelector, setShowFissureSelector] = useState(false);
  const [modalImage, setModalImage] = useState(null);


  useEffect(() => {
    const fetchFilteredData = async () => {
      const results = await fetchWorkshopEntry(searchTerm, page);
      setSubmittedData(results);
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

  return (
    <>
      <form
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
            { label: "Service", name: "service", type: "text" },
            { label: "Notes", name: "notes", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label>
                <h2>{label}</h2>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{ height: "35px", borderRadius: "4px" }}
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
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {fissureImages.map((img) => (
                <img
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

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1004px",
          }}
        >
          <thead style={{ color: "black" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Mail</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Racket</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Fissure Site</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Done/Delete</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((entry) => (
              <tr
                key={entry.id}
                style={{
                  backgroundColor: entry.completed ? "#419b45" : "transparent",
                }}
              >
                <td style={tdStyle}>{entry.id}</td>
                <td style={tdStyle}>{entry.name}</td>
                <td style={tdStyle}>{entry.lastName}</td>
                <td style={tdStyle}>{entry.mail}</td>
                <td style={tdStyle}>{entry.phone}</td>
                <td style={tdStyle}>{entry.racket}</td>
                <td style={tdStyle}>{entry.service}</td>
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

                <td style={tdStyle}>{entry.date}</td>
                <td style={tdStyle}>{entry.time}</td>
                <td style={tdStyle}>
                  <div>
                    <button onClick={() => handleCheck(entry.id)}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button>
                      <a
                        href={
                          entry.completed
                            ? `mailto:${entry.mail}?subject=Servicio&body=Hola ${entry.name}, tu servicio de ${entry.service} está listo para ser retirado.`
                            : undefined
                        }
                        style={{
                          pointerEvents:
                            entry.completed && !entry.emailSent
                              ? "auto"
                              : "none",
                          opacity:
                            entry.completed && !entry.emailSent ? 1 : 0.5,
                        }}
                      >
                        <i className="fa-solid fa-envelope"></i>
                      </a>
                    </button>

                    <button onClick={() => handleDelete(entry.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
