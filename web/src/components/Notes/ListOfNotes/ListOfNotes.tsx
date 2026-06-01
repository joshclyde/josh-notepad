import type { NoteSerialized } from "@josh-notepad/types";
import { ReadOnlyEditor } from "../NoteReadOnly/NoteReadOnly";

export const ListOfNotes = ({
  notes,
  setCurrentNoteId,
}: {
  notes: Record<string, NoteSerialized>;
  setCurrentNoteId: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col">
      {Object.values(notes).map((note) => {
        return (
          <button
            key={note.id}
            onClick={() => setCurrentNoteId(note.id)}
            className="w-2xl"
          >
            <div className="flex flex-col border-comment rounded-lg border">
              <p>{note.title}</p>
              <ReadOnlyEditor editorState={note.content} />
            </div>
          </button>
        );
      })}
    </div>
  );
};
