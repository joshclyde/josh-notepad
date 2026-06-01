import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const NOTES_DIR = path.join(__dirname, "../localDatabase/notes");
export const PORT = process.env.PORT || 3001;
