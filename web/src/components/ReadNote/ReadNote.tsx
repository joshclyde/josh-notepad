import type { Note } from "@josh-notepad/types";

export const ReadNote = ({ note }: { note: Note }) => {
  return (
    <div>
      <div>{note.title}</div>
      <div>{note.content}</div>
    </div>
  );
};
