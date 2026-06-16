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
    const baseSelect =
      "id, fullname, string, caliber, tension, racket, mail, date, time, completed, paid, notes";
    let query = supabase.from("string-client-data").select(baseSelect);

    if (searchTerm) {
      query = query.or(
        `fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`
      );
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
      .update(entry)
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
      query = query.or(
        `fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`
      );
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
      query = query.or(
        `fullname.ilike.%${searchTerm}%,string.ilike.%${searchTerm}%,racket.ilike.%${searchTerm}%`
      );
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

export const fetchUnpaidEntries = async() => {
  const { data, error } = await supabase
  .from("string-client-data")
  .select("*")
  .eq("paid", false)

  if (error){
    console.error("Failed to fetch unpaid: ", error);
    return []
  }
  return data
}

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
    const baseSelect =
      "id, fullname, mail, phone, racket, service, fissureSite, notes, date, time, completed, emailSent";
    let query = supabase.from("workshop-data").select(baseSelect);

    if (searchTerm) {
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
      .from("workshop-data")
      .update(entry)
      .eq("id", entry.id)
      .select();

    if (error) {
      console.error("Error updating workshop entry:", error.message);
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
      .from("workshop-data")
      .select("*", { count: "exact", head: true });

    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting workshop entries:", error);
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
    const baseSelect =
      "id, fullname, phone, email, model, type, notes, date, status";
    let query = supabase.from("reclamations-data").select(baseSelect);

    if (searchTerm) {
      query = query.or(
        `fullname.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`
      );
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
      query = query.or(
        `fullname.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`
      );
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

// Demos database

export const addDemoEntry = async (entry) => {
  try {
    const { data, error } = await supabase

      .from("demos-data")
      .insert(entry)
      .select();
    if (error) {
      console.error("Error adding data to database: ", error.message);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error adding demo entry", error);
  }
};

export const fetchDemoEntry = async ({ searchTerm = "", page = 1 }) => {
  try {
    const baseSelect =
      "id, fullname, mail, phone, demo, date, time, notes, paid";
    let query = supabase.from("demos-data").select(baseSelect);
    if (searchTerm) {
      query = query.or(`fullname.ilike.%${searchTerm}%`);
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

export const updateDemoEntry = async (entry) => {
  try {
    const { data, error } = await supabase
    .from('demos-data')
    .update(entry)
    .eq("id", entry.id)
    .select()
    if(error){
      console.error("Error updating demo entry ", error.message);
      return false
    }
    return data
      
  } catch (error) {
    console.error("Unexpected error updating demo entry " , error.message);
    
  }
}

export const countTotalDemos = async (searchTerm = "") => {
  try {
    let query = supabase
      .from("demos-data")
      .select("*", { count: "exact", head: true });

    if (searchTerm) {
      query = query.or(
        `fullname.ilike.%${searchTerm}%,demo.ilike.%${searchTerm}%`
      );
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error counting demos:", error);
      return 0;
    }
    return count;
  } catch (err) {
    console.error("Unexpected error counting demos:", err);
    return 0;
  }
};

export const deleteDemoEntry = async (id) => {
  try {
    const { error } = await supabase.from("demos-data").delete().eq("id", id);
    if (error) {
      console.error("Error deleting demo entry:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unexpected error deleting demo entry:", err);
    return false;
  }
};

export const fetchDemoCatalog = async () => {
  try {
    const { data, error } = await supabase
      .from("demo_models")
      .select("name, demo_brands(name)")
      .order("name");

    if (error) {
      console.error("Error fetching demo catalog:", error.message);
      return [];
    }

    const grouped = {};
    for (const row of data) {
      const brand = row.demo_brands.name;
      if (!grouped[brand]) grouped[brand] = [];
      grouped[brand].push(row.name);
    }

    return Object.entries(grouped).map(([brand, models]) => ({ brand, models }));
  } catch (err) {
    console.error("Unexpected error fetching demo catalog:", err);
    return [];
  }
};

export const addDemoCatalogModel = async (brandName, modelName) => {
  try {
    let { data: brand, error: brandError } = await supabase
      .from("demo_brands")
      .select("id")
      .eq("name", brandName)
      .single();

    if (brandError || !brand) {
      const { data: newBrand, error: insertError } = await supabase
        .from("demo_brands")
        .insert({ name: brandName })
        .select("id")
        .single();
      if (insertError) throw insertError;
      brand = newBrand;
    }

    const { error } = await supabase
      .from("demo_models")
      .insert({ brand_id: brand.id, name: modelName });

    if (error) {
      console.error("Error adding demo model:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unexpected error adding demo model:", err);
    return false;
  }
};

export const removeDemoCatalogModel = async (brandName, modelName) => {
  try {
    const { data: brand, error: brandError } = await supabase
      .from("demo_brands")
      .select("id")
      .eq("name", brandName)
      .single();

    if (brandError || !brand) return false;

    const { error } = await supabase
      .from("demo_models")
      .delete()
      .eq("brand_id", brand.id)
      .eq("name", modelName);

    if (error) {
      console.error("Error removing demo model:", error.message);
      return false;
    }

    const { count } = await supabase
      .from("demo_models")
      .select("*", { count: "exact", head: true })
      .eq("brand_id", brand.id);

    if (count === 0) {
      await supabase.from("demo_brands").delete().eq("id", brand.id);
    }

    return true;
  } catch (err) {
    console.error("Unexpected error removing demo model:", err);
    return false;
  }
};

export default { addEntry, addWorkshopEntry, addReclamationEntry, addDemoEntry };
