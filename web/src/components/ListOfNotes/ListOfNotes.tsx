import type { Note } from "@josh-notepad/types";

export const ListOfNotes = ({
  notes,
  setCurrentNoteId,
}: {
  notes: Record<string, Note>;
  setCurrentNoteId: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col">
      {Object.values(notes).map((note) => {
        return (
          <button key={note.id} onClick={() => setCurrentNoteId(note.id)}>
            {note.title}
          </button>
        );
      })}
    </div>
  );
};
