import { Profile } from "../models/Profile.js";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

export const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullname } = req.body;

  try {
    const profile = Profile.findOneByEmail(email);

    if (profile) {
      res.status(400).json({ message: "Профиль уже существует", code: "bad_jwt" });
    }

    await Profile.save({ email, password, fullname });

    const payload = { email };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token, type: "bearer" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Неизвестная ошибка на стороне сервера", code: "bad_jwt", err });
  }
});

authRoutes.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const profile = Profile.findOneByEmail(email);
    const isMatch = await Profile.comparePassword(email, password);

    if (!isMatch || !profile) {
      res.status(400).json({ message: "Неверные учетные данные", code: "bad_jwt" });
    }

    const payload = { email: profile.email };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token, type: "bearer" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Неизвестная ошибка на стороне сервера", code: "bad_jwt", err });
  }
});
