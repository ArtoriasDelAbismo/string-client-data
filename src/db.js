import { supabase } from "./supaBase";

export const PAGE_SIZE = 10;

{
  /* --- Strings Database --- */
}

export const addEntry = async (entry) => {
  const entryToInsert = { ...entry };
  delete entryToInsert.id; // remove id to let DB auto-generate

  try {
    const { data, error } = await supabase
      .from("string-client-data")
      .insert(entryToInsert)
      .select();

    if (error) {
      console.error("Error adding new string entry:", error.message);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Unexpected error adding new string entry:", error);
    throw error;
  }
};

export const fetchEntry = async (searchTerm = "", page = 1) => {
  try {
    const baseSelect = "id, fullname, string, caliber, tension, racket, mail, date, time, completed, paid, notes";
    let query = supabase.from("string-client-data").select(baseSelect);

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`);
    }

    query = query
      .order("id", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching string data:", error);
      return [];
    }

    return data.map((entry) => ({
      ...entry,
      completed: entry.completed ?? false,
    }));
  } catch (err) {
    console.error("Unexpected error fetching string data:", err);
    return [];
  }
};

export const updateEntry = async (entry) => {
  try {
    const { data, error } = await supabase
      .from("string-client-data")
      .update(entry) // Standardized: pass object directly
      .eq("id", entry.id)
      .select();

    if (error) {
      console.error("❌ Supabase string update error:", error.message);
      return false;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error updating string entry:", err);
    return false;
  }
};

export const countTotalEntries = async (searchTerm = "") => {
  try {
    let query = supabase
      .from("string-client-data")
      .select("*", { count: "exact", head: true });

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting string entries:", error);
      return 0;
    }
    return count;
  } catch (err) {
    console.error("Unexpected error counting string entries:", err);
    return 0;
  }
};

export const countUnpaidEntries = async (searchTerm = "") => {
  try {
    let query = supabase
      .from("string-client-data")
      .select("*", { count: "exact", head: true })
      .eq("paid", false);

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting unpaid entries:", error);
      return 0;
    }
    return count;
  } catch (err) {
    console.error("Unexpected error counting unpaid entries:", err);
    return 0;
  }
};

export const getMostUsed = async (column) => {
  try {
    const { data, error } = await supabase
      .from("string-client-data")
      .select(column);

    if (error) {
      console.error(`Error fetching ${column} data:`, error);
      return null;
    }

    const counts = data.reduce((acc, item) => {
      const value = item[column];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const mostUsed = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return mostUsed;
  } catch (err) {
    console.error(`Unexpected error fetching most used ${column}:`, err);
    return null;
  }
};

{
  /* --- Workshop Database --- */
}

export const addWorkshopEntry = async (entry) => {
  try {
    const { data, error } = await supabase
      .from("workshop-data")
      .insert(entry)
      .select();

    if (error) {
      console.error("Error adding new workshop entry:", error.message);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error adding new workshop entry:", error);
    throw error;
  }
};

export const fetchWorkshopEntry = async (searchTerm = "", page = 1) => {
  try {
    const baseSelect = "id, fullname, mail, phone, racket, service, fissureSite, notes, date, time, completed, emailSent";
    let query = supabase.from("workshop-data").select(baseSelect);

    if (searchTerm) {
      // Note: The original code had `name.ilike` and `lastName.ilike`.
      // Assuming the column is `fullname` like in the strings table.
      // If not, adjust this line accordingly.
      query = query.or(`fullname.ilike.%${searchTerm}%`);
    }

    query = query
      .order("id", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching workshop data:", error);
      return [];
    }

    return data.map((entry) => ({
      ...entry,
      completed: entry.completed ?? false,
    }));
  } catch (err) {
    console.error("Unexpected error fetching workshop data:", err);
    return [];
  }
};

export const updateWorkshopEntry = async (entry) => {
  try {
    const { data, error } = await supabase
      .from('workshop-data')
      .update(entry)
      .eq('id', entry.id)
      .select();

    if (error) {
      console.error('Error updating workshop entry:', error.message);
      return false;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error updating workshop entry:", err);
    return false;
  }
};

export const countTotalWorkshopEntries = async (searchTerm = "") => {
  try {
    let query = supabase
      .from('workshop-data')
      .select("*", { count: "exact", head: true });

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error counting workshop entries:', error);
      return 0;
    }
    return count;
  } catch (err) {
    console.error("Unexpected error counting workshop entries:", err);
    return 0;
  }
};

  /* --- Reclamations Database --- */

export const addReclamationEntry = async (entry) => {
  const entryToInsert = { ...entry };
  delete entryToInsert.id;

  try {
    const { data, error } = await supabase
      .from("reclamations-data")
      .insert(entryToInsert)
      .select();

    if (error) {
      console.error("Error adding new reclamation entry:", error.message);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Unexpected error adding new reclamation entry:", error);
    throw error;
  }
};

export const fetchReclamations = async (searchTerm = "", page = 1) => {
  try {
    const baseSelect = "id, fullname, phone, email, model, type, notes, date, status";
    let query = supabase.from("reclamations-data").select(baseSelect);

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`);
    }

    query = query
      .order("id", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching reclamations:", error);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching reclamations:", err);
    return [];
  }
};

export const updateReclamationEntry = async (entry) => {
  try {
    const { data, error } = await supabase
      .from("reclamations-data")
      .update(entry)
      .eq("id", entry.id)
      .select();

    if (error) {
      console.error("❌ Supabase reclamation update error:", error.message);
      return false;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error updating reclamation entry:", err);
    return false;
  }
};

export const countTotalReclamations = async (searchTerm = "") => {
  try {
    let query = supabase
      .from("reclamations-data")
      .select("*", { count: "exact", head: true });

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting reclamations:", error);
      return 0;
    }
    return count;
  } catch (err) {
    console.error("Unexpected error counting reclamations:", err);
    return 0;
  }
};


export default { addEntry, addWorkshopEntry, addReclamationEntry };
