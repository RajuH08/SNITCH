import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import passport from "passport";
import productsRouter from "./routes/products.routes.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5173/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can handle the user profile and tokens
      done(null, profile);
    },
  ),
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

export default app;
