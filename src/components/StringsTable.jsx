import React, { useState } from "react";
import { caliberOptions, tensionOptions } from "../data";

export default function StringsTable({
  submittedData,
  isEditingId,
  editData,
  handleEditChange,
  handleUpdate,
  handleEdit,
  handleToggleCheck,
  handleTogglePaid,
  handleComplete,
  isEditing,
  unpaidEntries,
  handleDuplicate,
  handleDelete,
}) 

{
  const [showUnpaidOnly, setShowUnpaidOnly] = useState(false)
  const displayedData = showUnpaidOnly ? unpaidEntries : submittedData;

  return (
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
            <th onClick={() => {setShowUnpaidOnly(!showUnpaidOnly)}} style={{cursor:'pointer'}} >Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ color: "white" }}>
          {displayedData.map((entry) => (
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
                    <button onClick={() => handleDuplicate(entry)}>
                      <i className="fa-solid fa-copy"></i>
                    </button>
                    <button onClick={() => handleDelete(entry.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
