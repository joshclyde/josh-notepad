import { useRef, useState } from "react";
import type { Note } from "@josh-notepad/types";
import { updateNote } from "../../database";

export const WriteNote = ({
  note,
}: {
  note: Note;
  // pass in a key too when using WriteNote
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = (nextTitle: string, nextContent: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updateNote(note.id, nextTitle, nextContent);
    }, 3000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    scheduleSave(e.target.value, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    scheduleSave(title, e.target.value);
  };

  return (
    <div>
      <input value={title} onChange={handleTitleChange} />
      <textarea value={content} onChange={handleContentChange} />
    </div>
  );
};
