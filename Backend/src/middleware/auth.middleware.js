import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";
import UserModel from "../models/user.model.js";


export const authenticateSeller = async (req,res,next) => {

  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if(!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next()

  }catch (err){
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}