import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    CONFIG.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: message,
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullName: user.fullName,
      role: user.role,
    }
  })

  return token;
}

export const registerUser = async (req, res) => {
  const { email, password, contact, fullName, isSeller } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with email or contact" });
    }

    const user = await userModel.create({
      email,
      password,
      contact,
      fullName,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "User Registered Successfully");

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {

  const {email, password} = req.body

  const user = await userModel.findOne({email})

  if(!user) {
    return res.status(400).json({message: "Invalid email or password"})
  }

  const isPasswordMatched = await user.comparePassword(password)

  if(!isPasswordMatched) {
    return res.status(400).json({message: "Invalid email or password"})
  }

  await sendTokenResponse(user, res, "User Logged In Successfully")

}

export const googleCallback = async (req,res) =>{

  const {id, displayName, emails , photos} = req.user 

  const email = emails[0].value
  const profilePicture = photos[0].value

  let user = await userModel.findOne({email})

  if(!user){
    user = await userModel.create({
      email,
      googleId: id,
      fullName: displayName,
    });
  }
  
  const token = jwt.sign({
    id: user._id,
  }, CONFIG.JWT_SECRET, {expiresIn: "7d"});

  res.cookie("token", token);

  res.redirect("http://localhost:5173/")
}