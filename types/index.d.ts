import type { EditorState, SerializedEditorState } from "lexical";

export type NoteSerialized = {
  id: string;
  title: string;
  content: SerializedEditorState;
};

export type NoteEditorState = {
  id: string;
  title: string;
  content: EditorState;
};
