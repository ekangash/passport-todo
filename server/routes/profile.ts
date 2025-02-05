import { Request, Response, Router } from "express";

import { Profile } from "../models/Profile.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const profileRoutes = Router();

profileRoutes.get(
  "/profile",
  authMiddleware,
  async (req: Request & { profile: { email: string } }, res: Response): Promise<void> => {
    try {
      const profile = Profile.findOneByEmail(req.profile.email);

      if (!profile) {
        res.status(401).json({ message: "Пользователь не авторизирован", code: "bad_jwt" });

        return;
      }

      const { password, ...publicAttributes } = profile;

      res.json(publicAttributes);
    } catch (err) {
      res.status(500).json({ message: "Неизвестная ошибка на стороне сервера", code: "bad_jwt" });
    }
  }
);
