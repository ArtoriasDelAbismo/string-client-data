import { useEffect, useState } from "react";
import {
  addWorkshopEntry,
  updateWorkshopEntry,
  fetchWorkshopEntry,
  countTotalWorkshopEntries,
  addEntry,
} from "./db";
import { supabase } from "./supaBase";

export const useWorkshopHandlers = (initialData, tableName) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchDataAndCount = async () => {
      const results = await fetchWorkshopEntry(searchTerm, page);
      setSubmittedData(results);

      const count = await countTotalWorkshopEntries(searchTerm);
      setTotalCount(count);
    };

    fetchDataAndCount();
  }, [searchTerm, page]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);

    const newEntry = {
      ...formData,
      date: currentDate,
      time: currentTime,
      completed: false,
      emailSent: false,
    };

    try {
      const [savedEntry] = await addWorkshopEntry(newEntry);
      if (page !== 1) {
        setPage(1);
      } else {
        setSubmittedData((prev) => [savedEntry, ...prev]);
        setTotalCount((prev) => prev + 1);
      }
      setFormData(initialData);
    } catch (error) {
      console.error("Failed to add workshop entry:", error);
    }
  };

  const handleComplete = (id) => {
    const updatedData = submittedData.map((entry) =>
      entry.id === id ? { ...entry, completed: true } : entry
    );
    setSubmittedData(updatedData);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("workshop-data")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Failed to delete entry:", error.message);
      return;
    }

    setSubmittedData((prev) => prev.filter((entry) => entry.id !== id));
    setTotalCount((prev) => prev - 1);
    console.log("🗑️ Successfully deleted entry with ID:", id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleToggleCheck = async (id, currentStatus) => {
    if (!Number.isInteger(id) || id < 0) {
      console.error("🚫 Invalid ID passed to handleToggleCheck:", id);
      return;
    }

    const { data, error } = await supabase
      .from("workshop-data")
      .update({ completed: !currentStatus })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Failed to update:", error.message);
    } else {
      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, completed: !currentStatus } : entry
        )
      );
    }
  };

  const handleEdit = (id) => {
    if (id === null) {
      setIsEditingId(null);
      setEditData({});
      return;
    }
    const entryToEdit = submittedData.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditData({ ...entryToEdit });
      setIsEditingId(id);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const updated = await updateWorkshopEntry(editData);
    if (updated) {
      const updatedList = submittedData.map((item) =>
        item.id === editData.id ? editData : item
      );
      setSubmittedData(updatedList);
      setIsEditingId(null);
    } else {
      console.error("❌ Update failed: updateEntry returned false");
    }
  };

  const handleDuplicate = async(entryToDuplicate) => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);

    const newEntry = {
      ...entryToDuplicate,
      date: currentDate,
      time: currentTime,
      completed: false,
    };
    delete newEntry.id;
    delete newEntry.created_at;

    try {
      const [savedEntry] = await addWorkshopEntry(newEntry);
      if(page !== 1) {
        setPage(1)
      } else {
        setSubmittedData((prev) => [savedEntry, ...prev]);
        setTotalCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to duplicate entry: ", error);
      
    }
  }

 

  return {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    editData,
    page,
    totalCount,
    setPage,
    setIsEditingId,
    setEditData,
    handleEdit,
    handleEditChange,
    handleChange,
    handleUpdate,
    handleComplete,
    handleDelete,
    handleSubmit,
    handleSearch,
    setFormData,
    setSearchTerm,
    setSubmittedData,
    handleToggleCheck,
    handleDuplicate,
  };
};
