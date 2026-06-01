import type { NoteSerialized } from "@josh-notepad/types";
import { ReadOnlyEditor } from "../NoteReadOnly/NoteReadOnly";

export const ListOfNotes = ({
  notes,
  selectedNoteId,
  onClickNote,
}: {
  notes: Record<string, NoteSerialized>;
  selectedNoteId?: string;
  onClickNote: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col border border-comment divide-y">
      {Object.values(notes).map((note) => {
        return (
          <button
            key={note.id}
            onClick={() => onClickNote(note.id)}
            className={`border-comment ${selectedNoteId === note.id ? "bg-selection" : ""}`}
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
