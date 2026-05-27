import type { Note } from "@josh-notepad/types";

const BASE_URL = "http://localhost:3001";

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${BASE_URL}/notes`);
  return res.json();
};

export const createNote = async (
  title: string,
  content: string,
): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};

export const updateNote = async (
  id: string,
  title: string,
  content: string,
): Promise<Note> => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};

export const deleteNote = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
};
