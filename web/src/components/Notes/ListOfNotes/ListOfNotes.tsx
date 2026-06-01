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
    <div className="flex flex-col border border-comment divide-y w-2xl">
      {Object.values(notes).map((note) => {
        return (
          <button
            key={note.id}
            onClick={() => setCurrentNoteId(note.id)}
            className="border-comment"
          >
            <div className="flex flex-col text-left p-1">
              <p className="text-green">{note.title}</p>
              <ReadOnlyEditor editorState={note.content} />
            </div>
          </button>
        );
      })}
    </div>
  );
};
