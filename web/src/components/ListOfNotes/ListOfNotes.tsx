import type { Note } from "../../database";

export const ListOfNotes = ({
  notes,
  setCurrentNoteId,
}: {
  notes: Array<Note>;
  setCurrentNoteId: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col">
      {notes.map((note) => {
        return (
          <button key={note.id} onClick={() => setCurrentNoteId(note.id)}>
            {note.title}
          </button>
        );
      })}
    </div>
  );
};
