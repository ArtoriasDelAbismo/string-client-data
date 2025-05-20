import { useState } from "react";
import { addEntry } from "./db";

export const useFormHandlers = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
      id: nextId,
      ...formData,
      date: currentDate,
      time: currentTime,

      completed: false,
    };

    setSubmittedData((prev) => [...prev, newEntry]);
    setNextId((prev) => prev + 1);

    await addEntry(newEntry);

    setFormData({
      name: "",
      lastName: "",
      string: "",
      caliber: "",
      tension: "",
      mail: "",
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


  return {
    formData,
    submittedData,
    nextId,
    searchTerm,
    handleChange,
    handleComplete,
    handleDelete,
    handleSubmit,
    handleSearch,
    setFormData,
    setNextId,
    setSearchTerm,
    setSubmittedData,
  };
};
