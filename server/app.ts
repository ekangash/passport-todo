import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { db } from "./config/db.js";
import { profileRoutes } from "./routes/profile.js";
import { authRoutes } from "./routes/auth.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
db.init();

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

const buildPath = path.normalize(path.join(__dirname, "../react"));
app.use(express.static(buildPath));
app.get("(/*)?", async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
