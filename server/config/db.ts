import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../db.json");

export const db = {
  read: () => {
    const rawData = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(rawData);
  },
  write: data => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  },
  init: () => {
    if (!fs.existsSync(filePath)) {
      db.write({ profiles: [] });
      console.log("Database initialized with empty profiles array.");
    } else {
      const data = db.read();

      if (!("profiles" in data)) {
        db.write({ profiles: [] });
        console.log("Profiles key added to existing database.");
      }
    }
  },
};
