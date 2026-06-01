import type { NoteSerialized } from "@josh-notepad/types";
import { ReadOnlyEditor } from "../NoteReadOnly/NoteReadOnly";

export const ReadNote = ({ note }: { note: NoteSerialized }) => {
  return (
    <div>
      <h1 className="text-green">{note.title}</h1>
      <ReadOnlyEditor editorState={note.content} />
    </div>
  );
};
