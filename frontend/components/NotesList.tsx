"use client";

import { useState } from "react";
import { Note, CreateNoteInput } from "@/lib/types";
import { createNote, deleteNote, updateNote } from "@/lib/api";

export default function NotesList({ initialNotes }: { initialNotes: Note[] }) {

  const [notes, setNotes] = useState(initialNotes);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

const handleCreate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const newNote = await createNote({ title: newTitle, content: newContent });
    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewContent("");
  };


const handleUpdate = async (id: number) => {
    const updated = await updateNote(id, {
      title: editTitle,
      content: editContent,
    });
    setNotes(notes.map((n) => (n.id === id ? updated : n)));
    setEditingId(null);
  };

  
  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  };


  return(

    <div>

       <form onSubmit={handleCreate} className="mb-8 border p-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="border p-2 w-full mb-2"
          rows={3}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded">
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border p-2 w-full mb-2"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(note.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(note.id);
                      setEditTitle(note.title);
                      setEditContent(note.content);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div> 
    </div>
  )

}