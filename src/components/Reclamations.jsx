import React from "react";
import { useReclamations } from "../useReclamations.js";
import Navbar from "./Navbar";
import ReclamationsTable from "./ReclamationsTable";
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
    handleResolved,
    updatingStatusId,
    loading,
  } = useReclamations({
    fullname: "",
    phone: "",
    email: "",
    model: "",
    type: "",
    notes: "",
  });

  const renderStatusContent = (entry, isResolved) => {
    const isUpdating = updatingStatusId === entry.id;

    if (isUpdating) {
      return <div className="spinner-small"></div>;
    }

    const status = entry.status;

    return (
      <div className="action-buttons">
        <button
          onClick={() => handleApprove(entry.id)}
          disabled={isResolved || status === "Approved"}
          className="status-button approve-button"
        >
          <a
            style={{ color: "white", fontWeight: "bold" }}
            disabled={isResolved || status === "Approved"}
            href={`mailto:${entry.mail}?subject=Solicitud de reclamo aprobada: ${entry.model}&body=Hola ${entry.fullname},%0A%0A
Tras analizar su reclamo, confirmamos que cumple con las características atribuibles a una falla del producto.%0A%0A
Te esperamos en nuestra sucursal de 9 a 17 hs para continuar con el proceso.%0A
Muchas gracias.`}
          >
            Approved
          </a>
        </button>
        <button
          onClick={() => handleDeny(entry.id)}
          disabled={isResolved || status === "Denied"}
          className="status-button deny-button"
        >
          <a
                      style={{ color: "white", fontWeight: "bold" }}
            disabled={isResolved || status === "Approved"}
            href={`mailto:${entry.mail}?subject=Solicitud de reclamo rechazada: ${entry.model}&body=Hola ${entry.fullname},%0A%0A
Tras analizar su reclamo lamentamos informarle que ha sido rechazado por no cumplir con las características correspondientes a una falla del producto.%0A%0A
Si desea más detalles sobre los motivos de esta decisión, no dude en contactarnos.%0A
Agradecemos su comprensión.%0A
Saludos cordiales.`}
          >
            Denied
          </a>
        </button>
        <button
          onClick={() => handleResolved(entry.id)}
          disabled={isResolved}
          className="status-button resolved-button"
        >
          Resolved
        </button>
      </div>
    );
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
            { label: "Notes", name: "notes", type: "text" },
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
            <ReclamationsTable
              submittedData={submittedData}
              isEditingId={isEditingId}
              editData={editData}
              handleEditChange={handleEditChange}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              renderStatusContent={renderStatusContent}
            />
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
