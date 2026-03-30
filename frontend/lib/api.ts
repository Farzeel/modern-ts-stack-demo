import { Note, CreateNoteInput, UpdateNoteInput } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/api/notes";

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function fetchNote(id: number): Promise<Note> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Note not found");
  return res.json();
}

export async function createNote(data: CreateNoteInput): Promise<Note> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(id: number, data: UpdateNoteInput): Promise<Note> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
}