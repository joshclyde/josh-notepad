import { useEffect, useState } from "react";
import "./App.css";
import { ListOfNotes } from "./components/ListOfNotes/ListOfNotes";
import { ReadNote } from "./components/ReadNote/ReadNote";
import { getNotes, createNote } from "./database";
import { type Note } from "@josh-notepad/types";
import { WriteNote } from "./components/WriteNote/WriteNote";

export const App = () => {
  const [currentNoteId, setCurrentNoteId] = useState<string | undefined>(
    undefined,
  );

  const [notes, setNotes] = useState<undefined | Record<string, Note>>(
    undefined,
  );

  const [noteView, setNoteView] = useState<"read" | "write">("read");

  useEffect(() => {
    (async () => {
      const allNotes = await getNotes();
      setNotes(Object.fromEntries(allNotes.map((note) => [note.id, note])));
    })();
  }, []);

  const [creatingNewNote, setCreatingNewNote] = useState(false);

  const handleAddNewNote = async () => {
    setCreatingNewNote(true);
    const newNote = await createNote("Untitled", "Body of note.");
    setNotes((prev) => ({ ...prev, [newNote.id]: newNote }));
    setCurrentNoteId(newNote.id);
    setNoteView("read");
    setCreatingNewNote(false);
  };

  console.log("NOTES" + JSON.stringify(notes));

  if (!notes) {
    return <div>Loading notes</div>;
  }

  if (creatingNewNote) {
    return <div>Creating new note.</div>;
  }

  return (
    <>
      {!currentNoteId ? (
        <div>
          <h1>List of Notes</h1>
          <button onClick={handleAddNewNote}>Add new note</button>
          <ListOfNotes notes={notes} setCurrentNoteId={setCurrentNoteId} />
        </div>
      ) : null}
      {currentNoteId && noteView === "read" ? (
        <>
          <div>
            <button onClick={() => setCurrentNoteId(undefined)}>Back</button>
            <button onClick={() => setNoteView("write")}>Edit</button>
          </div>
          <ReadNote note={notes[currentNoteId]}></ReadNote>
        </>
      ) : null}
      {currentNoteId && noteView === "write" ? (
        <>
          <div>
            <button
              onClick={() => {
                setCurrentNoteId(undefined);
                setNoteView("read");
              }}
            >
              Back
            </button>
          </div>
          <WriteNote note={notes[currentNoteId]} key={currentNoteId} />
        </>
      ) : null}
    </>
  );
};
