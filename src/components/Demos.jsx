import { useDemosHandlers } from "../useDemosHandlers.js";
import Navbar from "./Navbar";
import "./Demos.css";
import DemosForm from "./DemosForm.jsx";
import Search from "./Search.jsx";
import DemosTable from "./DemosTable.jsx";
import Pagination from "./Pagination.jsx";
import { useState } from "react";

export default function Demos() {
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

  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />

      <div className="demos-container">
        <DemosForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
        <div className="conditions-wrapper">
          <div className="conditions-container">
            <h2 onClick={() => {setOpen(!open)}}
              style={{ cursor:'pointer', userSelect:'none', height:'35px' }}
              >Condiciones {open ? "▲" : "▼"}</h2>

              {open && (
                <ul>
                  <li>
                    <b>Costo del Demo:</b> $10.000 por raqueta.
                  </li>
                  <li>
                    <b>Período de Prueba:</b> 3 días.
                  </li>
                  <li>
                    <b>Recargo por Demora:</b> Se cobrará un adicional de $5.000 por
                    cada día posterior a los 3 días iniciales.
                  </li>
                  <li>
                    <b>Descuento por Compra:</b> El costo del alquiler se descontará
                    del precio final si el cliente decide comprar la raqueta.
                  </li>
                  <li>
                    <b>No Reembolsable:</b> El costo del alquiler no será
                    reembolsado si el cliente no realiza la compra.
                  </li>
                </ul>

              )}
          </div>
        </div>

        <div className="submitted-data-container">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <DemosTable
              isEditingId={isEditingId}
              submittedData={submittedData}
              editData={editData}
              handleEditChange={handleEditChange}
              handleToggleCheck={handleToggleCheck}
              handleTogglePaid={handleTogglePaid}
              handleEdit={handleEdit}
              handleUpdate={handleUpdate}
            />
          )}

          <Pagination page={page} setPage={setPage} totalCount={totalCount} />
        </div>
      </div>
    </>
  );
}
