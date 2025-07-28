import { useEffect, useState } from "react";
import {
  addEntry,
  updateEntry,
  fetchEntry,
  countTotalEntries,
  countUnpaidEntries,
  getMostUsed,
} from "./db";
import { supabase } from "./supaBase";

export const useFormHandlers = (initialData, tableName) => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [mostUsedTension, setMostUsedTension] = useState(null);
  const [mostUsedCaliber, setMostUsedCaliber] = useState(null);
  const [mostUsedString, setMostUsedString] = useState(null);
  const [mostUsedRacket, setMostUsedRacket] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndCounts = async () => {
      setMetricsLoading(true);
      const results = await fetchEntry(searchTerm, page);
      const sanitizedResults = results.map((entry) => ({
        ...entry,
        completed: entry.completed ?? false,
      }));
      setSubmittedData(sanitizedResults);

      const total = await countTotalEntries(searchTerm);
      setTotalCount(total);

      const unpaid = await countUnpaidEntries(searchTerm);
      setUnpaidCount(unpaid);

      const tension = await getMostUsed("tension");
      setMostUsedTension(tension);

      const caliber = await getMostUsed("caliber");
      setMostUsedCaliber(caliber);

      const string = await getMostUsed("string");
      setMostUsedString(string);

      const racket = await getMostUsed("racket");
      setMostUsedRacket(racket);
      setMetricsLoading(false);
    };

    fetchDataAndCounts();
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
    };

    try {
      const [savedEntry] = await addEntry(newEntry, tableName);
      // Go back to the first page to see the new entry
      if (page !== 1) {
        setPage(1);
      } else {
        // If already on page 1, just add the new entry to the top
        setSubmittedData((prev) => [savedEntry, ...prev]);
        setTotalCount((prev) => prev + 1);
      }

      setFormData(initialData);
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
    setTotalCount((prev) => prev - 1); // Decrement total count
    console.log("🗑️ Successfully deleted entry with ID:", id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(1); // Reset to page 1 on new search
  };

  const handleToggleCheck = async (id, currentStatus) => {
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

  const handleTogglePaid = async (id, currentStatus) => {
    if (!Number.isInteger(id) || id < 0) {
      console.error("🚫 Invalid ID passed to handleTogglePaid:", id);
      return;
    }

    const { data, error } = await supabase
      .from("string-client-data")
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
    unpaidCount,
    mostUsedTension,
    mostUsedCaliber,
    mostUsedString,
    mostUsedRacket,
    metricsLoading,
    setPage,
    handleChange,
    handleEdit,
    handleEditChange,
    handleComplete,
    handleSubmit,
    handleSearch,
    handleUpdate,
    setFormData,
    setSearchTerm,
    setSubmittedData,
    handleToggleCheck,
    handleTogglePaid,
  };
};
