import type { Note } from "@josh-notepad/types";

export const ReadNote = ({ note }: { note: Note }) => {
  return (
    <div>
      <h1 className="text-green">{note.title}</h1>
      <div>{note.content}</div>
    </div>
  );
};
