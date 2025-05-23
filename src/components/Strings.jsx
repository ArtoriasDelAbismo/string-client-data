import React, { useEffect, useState } from "react";
import { useFormHandlers } from "../useFormHandlers";
import { fetchEntry } from "../db";

export default function Strings() {
  const {
    formData,
    submittedData,
    searchTerm,
    handleChange,
    handleComplete,
    handleDelete,
    handleSubmit,
    handleToggleCheck,
    setNextId,
    setSearchTerm,
    setSubmittedData,
  } = useFormHandlers({
    name: "",
    lastName: "",
    string: "",
    caliber: "",
    tension: "",
    mail: "",
    date: "",
    time: "",
  });

  const [page, setPage] = useState(1);

useEffect(() => {
  const fetchFilteredData = async () => {
    const results = await fetchEntry(searchTerm, page);

    // Ensure every entry has a `completed` boolean
    const sanitizedResults = results.map((entry) => ({
      ...entry,
      completed: entry.completed ?? false,
    }));

    setSubmittedData(sanitizedResults);

    const maxId = sanitizedResults.reduce((max, item) => Math.max(max, item.id), 0);
    setNextId(maxId + 1);
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
            { label: "String", name: "string", type: "text" },
            { label: "Caliber", name: "caliber", type: "text" },
            { label: "Tension", name: "tension", type: "text" },
            { label: "Mail", name: "mail", type: "email" },
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
              <th style={thStyle}>String</th>
              <th style={thStyle}>Caliber</th>
              <th style={thStyle}>Tension</th>
              <th style={thStyle}>Mail</th>
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
                <td style={tdStyle}>{entry.string}</td>
                <td style={tdStyle}>{entry.caliber}</td>
                <td style={tdStyle}>{entry.tension}</td>
                <td style={tdStyle}>{entry.mail}</td>
                <td style={tdStyle}>{entry.date}</td>
                <td style={tdStyle}>{entry.time}</td>
                <td style={tdStyle}>
                  <div>
                    <button onClick={() => {handleToggleCheck(entry.id, entry.completed)}}>
                    {entry.completed ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-check"></i> } 
                    </button>
                    <button>
                      <a
                        href={`mailto:${entry.mail}?subject=Encordado&body=Hola ${entry.name}, tu raqueta encordada con ${entry.string} está lista para ser retirada.`}
                        onClick={() => handleComplete(entry.id)}
                        style={{
                          pointerEvents: !entry.completed ? "none" : "auto",
                          opacity: !entry.completed ? 0.5 : 1,
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
