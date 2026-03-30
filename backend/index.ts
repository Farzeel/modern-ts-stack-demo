import { serve } from '@hono/node-server';
import { Hono } from 'hono'
import { cors } from "hono/cors";
import notesRouter from './src/routes/notes';


const app = new Hono()


app.use("/*", cors({ origin: "http://localhost:3000", credentials: true }));


app.route("/api/notes", notesRouter)

// Global error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = parseInt(process.env.PORT || "3001");

serve({
  fetch: app.fetch,
  port,
});
console.log(`API running on http://localhost:${port}`);





export default app