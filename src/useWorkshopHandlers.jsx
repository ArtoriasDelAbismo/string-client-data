import React, { useState } from "react";
import { addWorkshopEntry } from "./db";
import { supabase } from "./supaBase";
import { updateWorkshopEntry } from "./db";

export const useWorkshopHandlers = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // yyyy-mm-dd
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // hh:mm

    const newEntry = {
      ...formData,
      date: currentDate,
      time: currentTime,
      completed: false,
      emailSent: false,
    };

    const { data, error } = await supabase
      .from("workshop-data")
      .insert(newEntry)
      .select();

    if (error) {
      console.error("❌ Error inserting:", error.message);
      return;
    }

    setSubmittedData((prev) => [...prev, data[0]]);

    setFormData({
      name: "",
      lastName: "",
      service: "",
      notes: "",
      mail: "",
      phone: "",
      racket: "",
      date: "",
      time: "",
    });
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

    // Only update local state if deletion was successful
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
      .from("workshop-data")
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
  if (entryToEdit) {
    setEditData({ ...entryToEdit });
    setIsEditingId(id);
  } else {
    console.warn("⚠️ Entry to edit not found for id:", id);
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
  console.log("🚀 Updating entry:", editData); 
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



  return {
    formData,
    submittedData,
    searchTerm,
    isEditingId,
    setIsEditingId,
    editData,
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
  };
};
