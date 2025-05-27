import React, { useState } from "react";
import { addWorkshopEntry } from "./db";
import { supabase } from "./supaBase";

export const useWorkshopHandlers = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = (id) => {
    const updatedData = submittedData.filter((entry) => entry.id !== id);
    setSubmittedData(updatedData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

const handleToggleCheck = async (id, currentStatus) => {
  console.log("🔄 handleToggleCheck called with id:", id, "currentStatus:", currentStatus);

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



  return {
    formData,
    submittedData,
    searchTerm,
    handleChange,
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
