import { Router } from "express";
import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { NoteSerialized } from "@josh-notepad/types";
import { NOTES_DIR } from "../config.js";
import type {
  CreateNoteRequestBody,
  CreateNoteResponse,
  DeleteNoteParams,
  ErrorResponse,
  GetNotesResponse,
  UpdateNoteParams,
  UpdateNoteRequestBody,
  UpdateNoteResponse,
} from "../types.js";

const router = Router();

router.get("/notes", async (_req: Request, res: Response<GetNotesResponse>) => {
  const files = await fs.readdir(NOTES_DIR);
  const notes: NoteSerialized[] = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => {
        const raw = await fs.readFile(path.join(NOTES_DIR, f), "utf-8");
        return JSON.parse(raw) as NoteSerialized;
      }),
  );
  res.json({ notes });
});

router.post(
  "/notes",
  async (
    req: Request<{}, CreateNoteResponse | ErrorResponse, CreateNoteRequestBody>,
    res: Response<CreateNoteResponse | ErrorResponse>,
  ) => {
    const { title, content } = req.body;
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
  },
);

router.put(
  "/notes/:id",
  async (
    req: Request<UpdateNoteParams, UpdateNoteResponse | ErrorResponse, UpdateNoteRequestBody>,
    res: Response<UpdateNoteResponse | ErrorResponse>,
  ) => {
    const { id } = req.params;
    const filePath = path.join(NOTES_DIR, `${id}.json`);
    const { title, content } = req.body;
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
  },
);

router.delete(
  "/notes/:id",
  async (
    req: Request<DeleteNoteParams>,
    res: Response,
  ) => {
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
  },
);

export default router;
