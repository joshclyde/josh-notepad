import { useEffect, useState } from "react";
import "./App.css";
import { ListOfNotes } from "./components/ListOfNotes/ListOfNotes";
import { NoteView } from "./components/NoteView/NoteView";
import { getNotes } from "./database";
import { type Note } from "@josh-notepad/types";

export const App = () => {
  const [currentNoteId, setCurrentNoteId] = useState<string | undefined>(
    undefined,
  );

  const [notes, setNotes] = useState<undefined | Record<string, Note>>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      const allNotes = await getNotes();
      setNotes(Object.fromEntries(allNotes.map((note) => [note.id, note])));
    })();
  }, []);

  console.log("NOTES" + JSON.stringify(notes));

  if (!notes) {
    return <div>Loading notes</div>;
  }

  return (
    <>
      {!currentNoteId ? (
        <div className="flex flex-row">
          <ListOfNotes notes={notes} setCurrentNoteId={setCurrentNoteId} />
        </div>
      ) : null}
      {currentNoteId ? (
        <>
          <button onClick={() => setCurrentNoteId(undefined)}>Back</button>
          <NoteView note={notes[currentNoteId]}></NoteView>
        </>
      ) : null}
    </>
  );
};
