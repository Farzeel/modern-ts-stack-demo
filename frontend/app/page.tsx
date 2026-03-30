import NotesList from "@/components/NotesList";
import { fetchNotes } from "@/lib/api";

export default async function Home() {
  const notes = await fetchNotes();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <NotesList initialNotes={notes} />
    </main>
  );
}