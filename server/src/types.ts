import type { SerializedEditorState } from "lexical";
import type { NoteSerialized } from "@josh-notepad/types";

export interface PingResponse {
  message: string;
  timestamp: string;
}

export interface GetNotesResponse {
  notes: NoteSerialized[];
}

export interface CreateNoteRequestBody {
  title: string;
  content: SerializedEditorState;
}

export type CreateNoteResponse = NoteSerialized;

export interface UpdateNoteRequestBody {
  title: string;
  content: SerializedEditorState;
}

export interface UpdateNoteParams {
  id: string;
}

export type UpdateNoteResponse = NoteSerialized;

export interface DeleteNoteParams {
  id: string;
}

export interface ErrorResponse {
  error: string;
}
