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

  const fetchData = useCallback(async () => {
    const results = await fetchReclamations(searchTerm, page);
    setSubmittedData(results);
    const total = await countTotalReclamations(searchTerm);
    setTotalCount(total);
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
      status: "Pending", // New entries are always Pending
    };

    try {
      await addReclamationEntry(newEntry);
      setFormData(initialData); // Reset form
      fetchData(); // Refetch data to show the new entry
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
      fetchData(); // Refetch to show updated data
    }
  };
  
  const updateStatus = async (id, newStatus) => {
    const updated = await updateReclamationEntry({ id, status: newStatus });
    if (updated) {
      // Optimistically update the UI or refetch
      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status: newStatus } : entry
        )
      );
    }
  };

  const handleApprove = (id) => updateStatus(id, "Approved");
  const handleDeny = (id) => updateStatus(id, "Denied");

  const handleStatusToggle = (id, currentStatus) => {
    if (currentStatus === "Approved") {
      updateStatus(id, "Denied");
    } else if (currentStatus === "Denied") {
      updateStatus(id, "Approved");
    }
    // If "Pending" or other, do nothing, as that's handled by Approve/Deny buttons
  };

  return {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    editData,
    page,
    totalCount,
    setPage,
    handleChange,
    handleEdit,
    handleEditChange,
    handleSubmit,
    setSearchTerm,
    handleUpdate,
    handleApprove,
    handleDeny,
    handleStatusToggle,
  };
};
