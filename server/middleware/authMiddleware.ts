import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Нет токена, отказано в авторизации" });
  }

  try {
    req.profile = jwt.verify(token, "your_jwt_secret");

    next();
  } catch (err) {
    res.status(401).json({ message: "Токен недействителен" });
  }
};
