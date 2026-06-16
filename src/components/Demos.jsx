import { useDemosHandlers } from "../useDemosHandlers.js";
import Navbar from "./Navbar";
import "./Demos.css";
import DemosForm from "./DemosForm.jsx";
import DemosManager from "./DemosManager.jsx";
import Search from "./Search.jsx";
import DemosTable from "./DemosTable.jsx";
import Pagination from "./Pagination.jsx";
import { useState, useEffect } from "react";
import { fetchDemoCatalog, addDemoCatalogModel, removeDemoCatalogModel } from "../db.js";
import { useSnackbar } from "notistack";

export default function Demos() {
  const { enqueueSnackbar } = useSnackbar();
  const [demosOptions, setDemosOptions] = useState([]);

  useEffect(() => {
    fetchDemoCatalog().then(setDemosOptions);
  }, []);

  const handleAddModel = async (brandName, modelName) => {
    const ok = await addDemoCatalogModel(brandName, modelName);
    if (ok) {
      fetchDemoCatalog().then(setDemosOptions);
      enqueueSnackbar(`${modelName} added to ${brandName}!`, { variant: "success" });
    } else {
      enqueueSnackbar("Failed to add model.", { variant: "error" });
    }
  };

  const handleRemoveModel = async (brandName, modelName) => {
    const ok = await removeDemoCatalogModel(brandName, modelName);
    if (ok) {
      fetchDemoCatalog().then(setDemosOptions);
      enqueueSnackbar(`${modelName} removed.`, { variant: "info" });
    } else {
      enqueueSnackbar("Failed to remove model.", { variant: "error" });
    }
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
    handleDelete,
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
        <DemosForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          demosOptions={demosOptions}
        />

        <DemosManager demosOptions={demosOptions} onAdd={handleAddModel} onRemove={handleRemoveModel} />

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
              handleDelete={handleDelete}
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
