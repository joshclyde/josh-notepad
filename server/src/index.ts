import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import type { NoteSerialized } from "@josh-notepad/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.join(__dirname, "../localDatabase/notes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

app.get("/notes", async (req, res) => {
  const files = await fs.readdir(NOTES_DIR);
  const notes: NoteSerialized[] = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => {
        const raw = await fs.readFile(path.join(NOTES_DIR, f), "utf-8");
        return JSON.parse(raw) as NoteSerialized;
      }),
  );
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body as Partial<NoteSerialized>;
  if (title === undefined || content === undefined) {
    res.status(400).json({ error: "title and content are required" });
    return;
  }
  const note: NoteSerialized = { id: randomUUID(), title, content };
  await fs.writeFile(
    path.join(NOTES_DIR, `${note.id}.json`),
    JSON.stringify(note, null, 2),
  );
  res.status(201).json(note);
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const filePath = path.join(NOTES_DIR, `${id}.json`);
  const { title, content } = req.body as Partial<NoteSerialized>;
  if (title === undefined || content === undefined) {
    res.status(400).json({ error: "title and content are required" });
    return;
  }
  try {
    await fs.access(filePath);
  } catch {
    res.status(404).json({ error: "note not found" });
    return;
  }
  const note: NoteSerialized = { id, title, content };
  await fs.writeFile(filePath, JSON.stringify(note, null, 2));
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const filePath = path.join(NOTES_DIR, `${id}.json`);
  try {
    await fs.access(filePath);
  } catch {
    res.status(404).json({ error: "note not found" });
    return;
  }
  await fs.unlink(filePath);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
