import type { NoteSerialized } from "@josh-notepad/types";
import type { EditorState } from "lexical";
import { useRef, useState } from "react";
import { updateNote } from "../../../database";
import { NoteEditor } from "../NoteEditor/NoteEditor";

export const WriteNote = ({
  note,
}: {
  note: NoteSerialized;
  // pass in a key too when using WriteNote
}) => {
  const [title, setTitle] = useState(note.title);
  const formData = useRef({ content: note.content });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = () => {
    // clear previous timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // start new timeout
    timerRef.current = setTimeout(() => {
      updateNote({
        id: note.id,
        title: title,
        content: formData.current.content,
      });
    }, 3000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    scheduleSave();
  };

  const handleContentChange = (newEditorState: EditorState) => {
    formData.current.content = newEditorState.toJSON();
    scheduleSave();
  };

  return (
    <div className="flex flex-col">
      <input
        value={title}
        onChange={handleTitleChange}
        className="text-green border-comment rounded-sm border"
      />
      <NoteEditor
        initialEditorState={note.content}
        onChange={handleContentChange}
        // className="border-comment rounded-sm border"
      />
    </div>
  );
};
