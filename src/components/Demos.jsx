import React, { useState } from "react";
import { useDemosHandlers } from "../useDemosHandlers.js";
import Navbar from "./Navbar";
import { caliberOptions, tensionOptions, demosOptions } from "../data";
import { PAGE_SIZE } from "../db";
import "./Demos.css";

export default function Demos() {
  const selectFields = {
    caliber: caliberOptions,
    tension: tensionOptions,
    demos: demosOptions,
  };

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
    handleToggleCheck,
    handleTogglePaid,
    handleEditChange,
    setSearchTerm,
    page,
    setPage,
    totalCount,
    loading,
  } = useDemosHandlers({
    fullname: "",
    mail: "",
    phone: "",
    demo: "",
    date: "",
    time: "",
    notes: "",
    paid: false,
  });

  return (
    <>
      <Navbar />

      <div className="demos-container">
        <form className="demos-form" onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Mail", name: "mail", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Notes", name: "notes", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-field">
              <label>
                <h2>{label}</h2>
                {selectFields[name] ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {selectFields[name].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "notes" ? (
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
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              alignItems:'center',
              alignContent:'center',
              flexDirection: "column",

            }}
          >
            <label style={{marginBottom:'2px'}} htmlFor="select">Demo</label>
            <select
              name="demo"
              id="demos"
              style={{ height: "40px" }}
              onChange={handleChange}
              value={formData.demo}
              required
            >
              <option value="" disabled>
                Select a demo
              </option>
              {demosOptions.map((brandData) => (
                <optgroup key={brandData.brand} label={brandData.brand}>
                  {brandData.models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>
<div className="conditions-wrapper">
  <div className="conditions-container">
    <h2>Condiciones</h2>
    <ul>
      <li>
        <b>Costo del Demo:</b> $10.000 por raqueta.
      </li>
      <li>
        <b>Período de Prueba:</b> 3 días.
      </li>
      <li>
        <b>Recargo por Demora:</b> Se cobrará un adicional de $5.000 por cada día
        posterior a los 3 días iniciales.
      </li>
      <li>
        <b>Descuento por Compra:</b> El costo del alquiler se descontará del precio
        final si el cliente decide comprar la raqueta.
      </li>
      <li>
        <b>No Reembolsable:</b> El costo del alquiler no será reembolsado si el cliente
        no realiza la compra.
      </li>
    </ul>
  </div>

</div>


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
  href={`mailto:${entry.mail}?subject=Préstamo%20demo&body=Confirmación%20de%20préstamo%20de%20demo:%0A%0A` +
    `Modelo:%20${entry.demo}%0A` +
    `Fecha%20de%20retiro:%20${entry.date}%0A` +
    `Monto%20de%20seña%20abonado:%20$10000%0A%0A` +
    `Condiciones%20del%20préstamo:%0A` +
    `- El%20plazo%20de%20préstamo%20es%20de%203%20días%20corridos%20a%20partir%20de%20la%20fecha%20de%20retiro.%0A` +
    `- En%20caso%20de%20excederse%20en%20la%20devolución,%20se%20aplicará%20un%20cargo%20adicional%20de%20$5.000%20por%20cada%20día%20de%20demora.%0A` +
    `- En%20caso%20de%20decidir%20la%20compra%20del%20producto,%20el%20monto%20abonado%20como%20seña%20será%20descontado%20del%20precio%20final%20de%20la%20raqueta.%0A%0A` +
    `Ante%20cualquier%20consulta%20o%20para%20coordinar%20la%20devolución%20o%20adquisición%20del%20producto,%20quedamos%20a%20disposición.%0A%0ASaludos%0ATierra%20Batida%0A3425682136%0AAvellaneda%203199%20-%20Santa%20Fe`}
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
