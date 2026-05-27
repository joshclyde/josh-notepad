import type { Note } from "../../database";

export const NoteView = ({ note }: { note: Note }) => {
  return (
    <div>
      <div>{note.title}</div>
      <div>{note.content}</div>
    </div>
  );
};
