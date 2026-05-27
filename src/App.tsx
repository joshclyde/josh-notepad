import { useState } from "react";
import "./App.css";
import { ListOfNotes } from "./components/ListOfNotes/ListOfNotes";
import { NoteView } from "./components/NoteView/NoteView";
import { testData } from "./database";

export const App = () => {
  const [currentNoteId, setCurrentNoteId] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      {!currentNoteId ? (
        <div className="flex flex-row">
          <ListOfNotes notes={testData} setCurrentNoteId={setCurrentNoteId} />
        </div>
      ) : null}
      {currentNoteId ? (
        <>
          <button onClick={() => setCurrentNoteId(undefined)}>Back</button>
          <NoteView
            note={testData.find((value) => value.id === currentNoteId)}
          ></NoteView>
        </>
      ) : null}
    </>
  );
};
