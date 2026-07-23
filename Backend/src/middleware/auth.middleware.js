import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";
import UserModel from "../models/user.model.js";

export const authenticateSeller = async (req, res, next) => {
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies.token || bearerToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (
      err?.name === "TokenExpiredError" ||
      err?.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
