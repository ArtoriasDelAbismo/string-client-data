import { useEffect, useState, useCallback } from "react";
import {
  addReclamationEntry,
  fetchReclamations,
  updateReclamationEntry,
  countTotalReclamations,
} from "./db";

export const useReclamations = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const results = await fetchReclamations(searchTerm, page);
    setSubmittedData(results);
    const total = await countTotalReclamations(searchTerm);
    setTotalCount(total);
    setLoading(false);
  }, [searchTerm, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    
    const newEntry = {
      ...formData,
      date: currentDate,
      status: "Pending", 
    };

    try {
      await addReclamationEntry(newEntry);
      setFormData(initialData); 
      fetchData(); 
    } catch (error) {
      console.error("Failed to add reclamation: ", error);
    }
  };

  const handleEdit = (id) => {
    const entryToEdit = submittedData.find((entry) => entry.id === id);
    setIsEditingId(id);
    setEditData({ ...entryToEdit });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const updated = await updateReclamationEntry(editData);
    if (updated) {
      setIsEditingId(null);
      fetchData(); 
    }
  };
  
  const updateStatus = async (id, newStatus) => {
    setUpdatingStatusId(id);
    try {
      const updated = await updateReclamationEntry({ id, status: newStatus });
      if (updated) {
        setSubmittedData((prev) =>
          prev.map((entry) =>
            entry.id === id ? { ...entry, status: newStatus } : entry
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleApprove = (id) => updateStatus(id, "Approved");
  const handleDeny = (id) => updateStatus(id, "Denied");
  const handleResolved = (id) => {
    const entryToResolve = submittedData.find((entry) => entry.id === id);
    if (
      entryToResolve &&
      (entryToResolve.status === "Approved" ||
        entryToResolve.status === "Denied")
    ) {
      const newStatus = `Resolved-${entryToResolve.status}`;
      updateStatus(id, newStatus);
    } else if (entryToResolve) {
      // Fallback for other statuses like 'Pending'
      updateStatus(id, "Resolved");
    }
  };

  return {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    editData,
    page,
    totalCount,
    updatingStatusId,
    setPage,
    handleChange,
    handleEdit,
    handleEditChange,
    handleSubmit,
    setSearchTerm,
    handleUpdate,
    handleApprove,
    handleDeny,
    handleResolved,
  };
};
