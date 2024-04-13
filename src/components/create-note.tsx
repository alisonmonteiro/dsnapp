import {
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { createClient } from "@/lib/utils/supabase/component";
import { Input } from "./ui/input";

export const CreateNote: React.FC<{
  onAdd?: () => void;
}> = ({ onAdd }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      const response = await supabase.from("notes").insert({
        title: noteTitle,
        text: noteText,
        status: true,
        user_id: auth.user?.id,
      });

      if (response.error) {
        throw response.error;
      }

      onAdd?.();
    } catch (error) {
      setError("An error occurred while adding the note.");
      console.error(error);
    } finally {
      setNoteText("");
      setNoteTitle("");
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1024px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Add note</DialogTitle>
            <div className="text-base pt-4 flex flex-col space-y-4">
              <div>
                <Label htmlFor="title">Title:</Label>
                <Input
                  id="title"
                  name="title"
                  className="mt-1"
                  placeholder="Title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="note">Your note:</Label>
                <Textarea
                  id="note"
                  name="note"
                  className="mt-1"
                  placeholder="Title"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  required
                />
              </div>
            </div>
          </DialogHeader>

          {Boolean(error) && (
            <div className="py-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <DialogFooter className="mt-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
