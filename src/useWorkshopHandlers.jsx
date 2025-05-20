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
    .select(); // this returns the inserted row(s) including auto-generated id

  if (error) {
    console.error("❌ Error inserting:", error.message);
    return;
  }

  // Add the returned entry (with valid `id`) to the state
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
  const handleCheck = async (id) => {
    console.log("🔍 handleCheck called with id:", id); // Add this

    if (!id || typeof id !== "number") {
      console.error("🚫 Invalid ID passed to handleCheck:", id);
      return;
    }

    const { data, error } = await supabase
      .from("workshop-data")
      .update({ completed: true })
      .eq("id", id)
      .select(); // include select to get proper error messages

    if (error) {
      console.error("❌ Failed to update:", error.message);
    } else {
      console.log("✅ Updated row:", data);

      // Update local state
      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, completed: true } : entry
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
    handleCheck,
  };
};
