import React from 'react'

export default function DemosTable({ isEditingId, submittedData, editData, handleEditChange, handleToggleCheck, handleTogglePaid, handleEdit, handleUpdate }) {
  return (
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
                                  href={
                                    `mailto:${entry.mail}?subject=Préstamo%20demo&body=Confirmación%20de%20préstamo%20de%20demo:%0A%0A` +
                                    `Modelo:%20${entry.demo}%0A` +
                                    `Fecha%20de%20retiro:%20${entry.date}%0A` +
                                    `Monto%20de%20seña%20abonado:%20$10000%0A%0A` +
                                    `Condiciones%20del%20préstamo:%0A` +
                                    `- El%20plazo%20de%20préstamo%20es%20de%203%20días%20corridos%20a%20partir%20de%20la%20fecha%20de%20retiro.%0A` +
                                    `- En%20caso%20de%20excederse%20en%20la%20devolución,%20se%20aplicará%20un%20cargo%20adicional%20de%20$5.000%20por%20cada%20día%20de%20demora.%0A` +
                                    `- En%20caso%20de%20decidir%20la%20compra%20del%20producto,%20el%20monto%20abonado%20como%20seña%20será%20descontado%20del%20precio%20final%20de%20la%20raqueta.%0A%0A` +
                                    `Ante%20cualquier%20consulta%20o%20para%20coordinar%20la%20devolución%20o%20adquisición%20del%20producto,%20quedamos%20a%20disposición.%0A%0ASaludos%0ATierra%20Batida%0A3425682136%0AAvellaneda%203199%20-%20Santa%20Fe`
                                  }
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
  )
}
