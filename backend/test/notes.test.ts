import app from "..";
import { mockDb } from "./mockdb";
import { describe, expect, it, beforeEach, mock } from "bun:test";

describe("Notes API Integration", () => {

    // Reset mock history between tests
    mock.restore(); 
    // If using the manual mockDb object:
    mockDb.select.mockClear();
    mockDb.insert.mockClear();

    // ### 1. Test GET /notes
  it("GET /notes should return all notes", async () => {
    const mockData = [{ id: 1, title: "Test Note", content: "Hello" }];
    
    // Tell our mock what to return for this specific test
    // Note: We follow the chain we built earlier
    (mockDb.select().from().orderBy as any).mockResolvedValue(mockData);

    const res = await app.request("/api/notes");
    
    expect(res.status).toBe(200);

    expect(await res.json()).toEqual(mockData);
  });

//   ### 2. Test POST /notes (Success)
  it("POST /notes should create a note with valid data", async () => {
    const newNote = { title: "New Note", content: "Some content" };
    mockDb.insert().values().returning.mockResolvedValue([{ id: 1, ...newNote }]);

    const res = await app.request("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.title).toBe("New Note");
  });

// ### 3. Test POST /notes (Validation Failure)
  it("POST /notes should fail if title is missing (Zod validation)", async () => {
    const invalidNote = { content: "Missing title" };

    const res = await app.request("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidNote),
    });

    // Hono's zValidator returns 400 by default on failure
    expect(res.status).toBe(400);
  });


//   ### 4. Test GET /notes/:id (404 Logic)
  it("GET /notes/:id should return 404 if note doesn't exist", async () => {
    // Mock an empty array response from the DB
    (mockDb.select().from().where().limit as any).mockResolvedValue([]);

    const res = await app.request("api/notes/999");

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
  });

// ### 5. Test DELETE /notes/:id
  it("DELETE /notes/:id should return deleted note", async () => {
    (mockDb.delete().where() as any).returning.mockResolvedValue([{ id: 1, title: "Deleted" }]);

    const res = await app.request("api/notes/1", {
      method: "DELETE",
    });

    expect(res.status).toBe(200);
    expect(mockDb.delete).toHaveBeenCalled();
  });

})