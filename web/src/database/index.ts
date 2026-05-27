import type { Note } from "@josh-notepad/types";

export type { Note };

export const testData: Array<Note> = [
  {
    id: "1",
    title: "foo",
    content: "foo foo foo",
  },
  {
    id: "2",
    title: "bar",
    content: "bar bar bar",
  },
  {
    id: "3",
    title: "baz",
    content: "baz baz baz",
  },
];

export const getNotes = () => {};
