import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { encrypt } from "packages/crypt/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.get("/api/passport/profile", (req, res) => {
  res.status(200).json({ message: "Учетная запись не авторизированна" });
});

app.post("/api/passport/login", (req, res) => {
  const credentials = req.body;
  const accessToken = "wrewrwerw";
  const session = encrypt({ email: credentials["email"], accessToken });

  // res.cookie("passport", session, {
  //   httpOnly: true,
  //   secure: true,
  //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 месяц
  // });

  res.status(200).json({ data: credentials, accessToken });
});

const buildPath = path.normalize(path.join(__dirname, "../build/dist"));
app.use(express.static(buildPath));
app.get("(/*)?", async (req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
