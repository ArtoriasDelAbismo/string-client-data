import React from "react";

export default function WorkshopTable({
  submittedData,
  isEditingId,
  isEditing,
  editData,
  handleComplete,
  handleEdit,
  handleEditChange,
  handleToggleCheck,
  handleUpdate,
  totalCount,
  setModalImage,
  handleDuplicate,
  handleDelete,
}) {
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>Racket</th>
            <th>Service</th>
            <th>Fissure Site</th>
            <th>Notes</th>
            {!isEditingId && <th>Date</th>}
            {!isEditingId && <th>Time</th>}
            <th>Done/Edit</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {submittedData.map((entry) => (
            <tr
              key={entry.id}
              className={entry.completed ? "completed-row" : ""}
            >
              <td data-label="id">
                {isEditingId === entry.id ? (
                  <input
                    name="id"
                    value={editData.id}
                    onChange={handleEditChange}
                  />
                ) : (
                  entry.id
                )}
              </td>
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
              <td data-label="Service">
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
              <td data-label="Fissure Site">
                {entry.fissureSite && (
                  <img
                    src={entry.fissureSite}
                    alt="Fissure site"
                    className="fissure-site-image"
                    onClick={() => setModalImage(entry.fissureSite)}
                  />
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
              {!isEditing && (
                <>
                  <td data-label="Date">{entry.date}</td>
                  <td data-label="Time">{entry.time}</td>
                </>
              )}
              <td data-label="Actions">
                <div className="action-buttons workshop-row-actions">
                  {isEditingId === entry.id ? (
                    <>
                      <button onClick={handleUpdate}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleEdit(null)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      {!entry.completed ? (
                        <button
                          onClick={() => {
                            handleComplete(entry.id);
                            handleToggleCheck(entry.id, entry.completed);
                          }}
                        >
                          <a
                            href={`mailto:${entry.mail}?subject=Reparación&body=Hola ${entry.fullname}, tu servicio de ${entry.service} está listo para ser retirado. Te esperamos!`}
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
                    </>
                  )}
                </div>
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
        }}
      >
        <p>Total workshop database entries: {totalCount}</p>
      </div>
    </div>
  );
}
