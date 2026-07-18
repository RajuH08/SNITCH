import express from "express";
import { createProduct } from "../controllers/products.controllers.js";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductValidationRules } from "../validators/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const router = express.Router();

router.post(
  "/",
  authenticateSeller,
  createProductValidationRules,
  upload.array("images", 7),
  createProduct,
);

export default router;
