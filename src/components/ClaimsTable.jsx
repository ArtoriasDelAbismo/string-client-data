import React from "react";
import ClaimsRow from "./ClaimsRow";

const ClaimsTable = ({
  submittedData,
  isEditingId,
  editData,
  handleEditChange,
  handleUpdate,
  handleEdit,
  renderStatusContent,
}) => {
  return (
    <div className="table-container reclamations-table-container">
      <table className="responsive-table">
        <thead>
          <tr style={{ color: "black" }}>
            <th>ID</th>
            <th>Outcome</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Model</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ color: "white" }}>
          {submittedData.map((entry) => (
            <ClaimsRow
              key={entry.id}
              entry={entry}
              isEditingId={isEditingId}
              editData={editData}
              handleEditChange={handleEditChange}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              renderStatusContent={renderStatusContent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsTable;
