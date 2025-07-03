import { useEffect, useState } from "react";
import { addEntry } from "./db";
import { supabase } from "./supaBase";
import { updateEntry } from "./db";
import { fetchEntry } from "./db";

export const useFormHandlers = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [entries, setEntries] = useState(null);
const [page, setPage] = useState(1);




  useEffect(() => {
    const fetchFilteredData = async () => {
      const results = await fetchEntry(searchTerm);
      const sanitizedResults = results
        .map((entry) => ({
          ...entry,
          completed: entry.completed ?? false,
        }))
        .sort((a, b) => b.id - a.id);

      setSubmittedData(sanitizedResults);

      const maxId = sanitizedResults.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      setNextId(maxId + 1);
    };

    fetchFilteredData();
  }, [searchTerm]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // yyyy-mm-dd
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // hh:mm

    const newEntry = {
      ...formData,
      date: currentDate,
      time: currentTime,
      completed: false,
    };

    try {
      const [savedEntry] = await addEntry(newEntry);

      setSubmittedData((prev) => [savedEntry, ...prev]);
      setPage(1);

      setFormData({
        fullname: "",
        string: "",
        caliber: "",
        tension: "",
        racket: "",
        mail: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Failed to add entry: ", error);
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
      .from("string-client-data")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Failed to delete entry:", error.message);
      return;
    }

    setSubmittedData((prev) => prev.filter((entry) => entry.id !== id));
    console.log("🗑️ Successfully deleted entry with ID:", id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleToggleCheck = async (id, currentStatus) => {
    console.log(
      "🔄 handleToggleCheck called with id:",
      id,
      "currentStatus:",
      currentStatus
    );

    if (!Number.isInteger(id) || id < 0) {
      console.error("🚫 Invalid ID passed to handleToggleCheck:", id);
      return;
    }

    const { data, error } = await supabase
      .from("string-client-data")
      .update({ completed: !currentStatus })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Failed to update:", error.message);
    } else {
      console.log("✅ Toggled row:", data);

      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, completed: !currentStatus } : entry
        )
      );
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
    console.log("🚀 Updating entry:", editData);
    const updated = await updateEntry(editData);
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

  useEffect(() => {
  const fetchFilteredData = async () => {
    const results = await fetchEntry(searchTerm, page);
    const sanitizedResults = results
      .map((entry) => ({
        ...entry,
        completed: entry.completed ?? false,
      }))
      .sort((a, b) => b.id - a.id);

    setSubmittedData(sanitizedResults);

    const maxId = sanitizedResults.reduce(
      (max, item) => Math.max(max, item.id),
      0
    );
    setNextId(maxId + 1);
  };

  fetchFilteredData();
}, [searchTerm, page]); 


  return {
    formData,
    submittedData,
    nextId,
    searchTerm,
    isEditingId,
    editData,
    handleChange,
    handleEdit,
    handleEditChange,
    handleComplete,
    handleSubmit,
    handleSearch,
    handleUpdate,
    setFormData,
    setNextId,
    setSearchTerm,
    setSubmittedData,
    handleToggleCheck,
    page,
    setPage,
  };
};
