import { supabase } from "./supaBase";

{
  /* Strings database */
}

export const addEntry = async (entry) => {
  try {
    const { data, error } = await supabase
      .from("string-client-data")
      .insert(entry)
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

const PAGE_SIZE = 10;

export const fetchEntry = async (searchTerm = "", page = 1) => {
  try {
    let query = supabase
      .from("string-client-data")
      .select("*")
      .order("id", { ascending: true })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

if (searchTerm) {
  query = supabase
    .from("string-client-data")
    .select("*")
    .or(`name.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`)
    .order("id", { ascending: true })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
} else {
  query = supabase
    .from("string-client-data")
    .select("*")
    .order("id", { ascending: true })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
}


    const { data, error } = await query;
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return [];
  }
};

{/* Workshop database */}

export const addWorkshopEntry = async (entry) => {
  try {
console.log("Inserting entry:", entry);
const { data, error } = await supabase
  .from("workshop-data")
  .insert(entry)
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
    let query = supabase
      .from("workshop-data")
      .select("*")
      .order("id", { ascending: true })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

if (searchTerm) {
  query = supabase
    .from("workshop-data")
    .select("*")
    .or(`name.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`)
    .order("id", { ascending: true })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
}


    const { data, error } = await query;
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return [];
  }
};

export default { addEntry, addWorkshopEntry };
