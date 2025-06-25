import { supabase } from "./supaBase";

{
  /* Strings database */
}

export const addEntry = async (entry) => {
  const entryToInsert = { ...entry };
  delete entryToInsert.id;  // remove id to let DB auto-generate

  console.log("Inserting entry to DB:", entryToInsert);
  
  try {
    const { data, error } = await supabase
      .from("string-client-data")
      .insert(entryToInsert)
      .select();

    if (error) {
      console.log("Error adding new entry ", error);
      throw error;
    }

    console.log("Added new entry: ", data);
    return data;
  } catch (error) {
    console.error("Unexpected error adding new entry: ", error);
    throw error;
  }
};



const PAGE_SIZE = 10;

export const fetchEntry = async (searchTerm = "", page = 1) => {
  try {
    const baseSelect = "id, name, lastName, string, caliber, tension, racket, mail, date, time, completed";
    let query = supabase
      .from("string-client-data")
      .select(baseSelect)
      .order("id", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (searchTerm) {
      query = supabase
        .from("string-client-data")
        .select(baseSelect)
        .or(`name.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`)
        .order("id", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    // Sanitize to ensure `completed` is boolean
    return data.map((entry) => ({
      ...entry,
      completed: entry.completed ?? false,
    }));
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return [];
  }
};

export const updateEntry = async (entry) => {
  const { data, error } = await supabase
    .from("string-client-data")
    .update([entry])
    .eq("id", entry.id)
    .select();

  if (error) {
    console.error("❌ Supabase update error:", error.message);
    return false;
  }

  return data;
};





{
  /* Workshop database */
}

export const addWorkshopEntry = async (entry) => {
  try {
    console.log("Inserting entry:", entry);
    const { data, error } = await supabase
      .from("workshop-data")
      .insert([entry])
      .select();

    if (error) {
      console.log("Error adding new entry ", error);
      return;
    }

    console.log("Added new entry: ", data);
  } catch (error) {
    console.error("Unexpected error adding new entry: ", error);
  }
};

export const fetchWorkshopEntry = async (searchTerm = "", page = 1) => {
  try {
    const baseSelect = "id, name, lastName, mail, phone, racket, service, fissureSite, notes, date, time, completed, emailSent";
    let query = supabase
      .from("workshop-data")
      .select(baseSelect)
      .order("id", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (searchTerm) {
      query = supabase
        .from("workshop-data")
        .select(baseSelect)
        .or(`name.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`)
        .order("id", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data.map((entry) => ({
      ...entry,
      completed: entry.completed ?? false,
    }));
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return [];
  }
};

export const updateWorkshopEntry = async (entry) => {
  const { data, error } = await supabase
  .from('workshop-data')
  .update(entry)
  .eq('id', entry.id)
  .select()

  if (error) {
    console.log('Error updating entry: ', error.message);
    return false
  }

  return data
}


/* Entries counter */

export const countTotalEntries = async () => {
  const { count, error } = await supabase
    .from("string-client-data")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error counting entries:", error);
    return 0; 
  }

  return count;
};


export default { addEntry, addWorkshopEntry };
