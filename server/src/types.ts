import { Note } from "@josh-notepad/types";

export interface Database {
  notes: Record<string, Note>;
}
