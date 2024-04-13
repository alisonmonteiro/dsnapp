import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/component";

interface Note {
  id: number;
  title: string;
  text: string;
  status: boolean;
  uuid: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useNotes = () => {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*");

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    refreshNotes: fetchNotes,
  };
};