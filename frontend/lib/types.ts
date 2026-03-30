export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateNoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;
export type UpdateNoteInput = Partial<CreateNoteInput>;