import { useEffect, useState } from "react";
import { ListOfNotes } from "../Notes/ListOfNotes/ListOfNotes";
import { getNotes, createNote } from "../../database";
import { type NoteSerialized } from "@josh-notepad/types";
import type { SerializedEditorState } from "lexical";
import { WriteNote } from "./WriteNote/WriteNote";

const EMPTY_EDITOR_STATE: SerializedEditorState = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

export const Notes = () => {
  const [currentNoteId, setCurrentNoteId] = useState<string | undefined>(
    undefined,
  );

  const [notes, setNotes] = useState<
    undefined | Record<string, NoteSerialized>
  >(undefined);

  useEffect(() => {
    (async () => {
      const allNotes = await getNotes();
      setNotes(Object.fromEntries(allNotes.map((note) => [note.id, note])));
    })();
  }, []);

  const [creatingNewNote, setCreatingNewNote] = useState(false);

  const handleAddNewNote = async () => {
    setCreatingNewNote(true);
    const newNote = await createNote("Untitled", EMPTY_EDITOR_STATE);
    setNotes((prev) => ({ ...prev, [newNote.id]: newNote }));
    setCurrentNoteId(newNote.id);
    setCreatingNewNote(false);
  };

  if (!notes) {
    return <div>Loading notes</div>;
  }

  return (
    <div className="flex">
      <div className="w-lg">
        <button onClick={handleAddNewNote}>Add new note</button>
        <ListOfNotes
          notes={notes}
          onClickNote={setCurrentNoteId}
          selectedNoteId={currentNoteId}
        />
      </div>
      <div className="w-full">
        {!currentNoteId ? "Foobar" : null}
        {currentNoteId ? (
          <WriteNote note={notes[currentNoteId]} key={currentNoteId} />
        ) : null}
      </div>
    </div>
  );
};
