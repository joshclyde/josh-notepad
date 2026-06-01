import { NoteSerialized } from "@josh-notepad/types";

export interface Database {
  notes: Record<string, NoteSerialized>;
}
