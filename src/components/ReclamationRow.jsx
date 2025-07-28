import React from "react";

const ReclamationRow = ({
  entry,
  isEditingId,
  editData,
  handleEditChange,
  handleUpdate,
  handleEdit,
  renderStatusContent,
}) => {
  const isEditing = isEditingId === entry.id;
  const isResolved = entry.status === "Resolved";

  const rowClass =
    entry.status === "Approved"
      ? "reclamation-row-approved"
      : entry.status === "Denied"
      ? "reclamation-row-denied"
      : entry.status === "Resolved"
      ? "reclamation-row-resolved"
      : "";

  return (
    <tr className={rowClass}>
      <td data-label="ID">{entry.id}</td>
      <td data-label="Full Name">
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
      <td data-label="Status">{renderStatusContent(entry, isResolved)}</td>
      <td data-label="Actions">
        {isEditing ? (
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
            <button onClick={() => handleEdit(entry.id)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ReclamationRow;
