import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping.js";
import notesRouter from "./routes/notes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(pingRouter);
app.use(notesRouter);

export default app;
