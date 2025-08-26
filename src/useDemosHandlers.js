import { useState, useEffect, useCallback } from "react";
import {
  addDemoEntry,
  fetchDemoEntry,
  updateDemoEntry,
  countTotalDemos,
} from "./db";
import { supabase } from "./supaBase";

export const useDemosHandlers = (initialData) => {
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
    try {
      const data = await fetchDemoEntry({ searchTerm, page });
      const total = await countTotalDemos(searchTerm);
      setSubmittedData(data);
      setTotalCount(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    setIsEditingId(id);
    if (id) {
      const dataToEdit = submittedData.find((entry) => entry.id === id);
      setEditData(dataToEdit);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateDemoEntry(editData);
      if (updated) {
        setSubmittedData((prev) =>
          prev.map((entry) =>
            entry.id === editData.id ? { ...entry, ...editData } : entry
          )
        );
        setIsEditingId(null);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const now = new Date();
      const newEntry = {
        ...formData,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        completed: false,
      };
      const addedEntry = await addDemoEntry(newEntry);
      if (addedEntry) {
        setSubmittedData((prev) => [addedEntry[0], ...prev]);
        setFormData(initialData);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCheck = async (id, currentStatus) => {
    setUpdatingStatusId(id);

    try {
      const updated = await updateDemoEntry({
        id,
        completed: !currentStatus,
      });
      if (updated) {
        setSubmittedData((prev) =>
          prev.map((entry) =>
            entry.id === id ? { ...entry, completed: !currentStatus } : entry
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleTogglePaid = async (id, currentStatus) => {
    if (!Number.isInteger(id) || id < 0) {
      console.error("🚫 Invalid ID passed to handleTogglePaid:", id);
      return;
    }

    const { data, error } = await supabase
      .from("demos-data")
      .update({ paid: !currentStatus })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Failed to update paid status:", error.message);
    } else {
      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, paid: !currentStatus } : entry
        )
      );
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
    loading,
    setFormData,
    setSubmittedData,
    setSearchTerm,
    setIsEditingId,
    setEditData,
    setPage,
    setTotalCount,
    setUpdatingStatusId,
    setLoading,
    handleChange,
    handleEditChange,
    handleEdit,
    handleUpdate,
    handleSubmit,
    handleToggleCheck,
    handleTogglePaid,
  };
};