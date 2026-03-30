import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import  { notes,type NewNote } from "../db/schema";
import { eq } from "drizzle-orm";


const createNoteSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
});

const updateNoteSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).optional(),
});

const notesRouter = new Hono();

notesRouter.get("/", async (c) => {
  const allNotes = await db.select().from(notes).orderBy(notes.createdAt);
  return c.json(allNotes);
});

// GET /notes/:id
notesRouter.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const note = await db.select().from(notes).where(eq(notes.id, id)).limit(1);
  if (!note.length) return c.json({ error: "Not found" }, 404);
  return c.json(note[0]);
});

// POST /notes
notesRouter.post("/", zValidator("json", createNoteSchema), async (c) => {
  const data = c.req.valid("json") as NewNote;
  const [newNote] = await db.insert(notes).values(data).returning();
  return c.json(newNote, 201);
});



// PATCH /notes/:id
notesRouter.patch("/:id", zValidator("json", updateNoteSchema), async (c) => {
  const id = parseInt(c.req.param("id"));
  const data = c.req.valid("json");
  const [updated] = await db
    .update(notes)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(notes.id, id))
    .returning();
  if (!updated) return c.json({ error: "Not found" }, 404);
  return c.json(updated);
});

// DELETE /notes/:id
notesRouter.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const [deleted] = await db.delete(notes).where(eq(notes.id, id)).returning();
  if (!deleted) return c.json({ error: "Not found" }, 404);
  return c.json(deleted);
});


export default notesRouter;


