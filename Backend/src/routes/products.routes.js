import express from "express";
import {
  createProduct,
  getAllProductsBySeller,
} from "../controllers/products.controllers.js";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductValidationRules } from "../validators/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const router = express.Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 */
router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidationRules,
  createProduct,
);

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Each image must be 5MB or less",
        success: false,
      });
    }

    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }

  if (error?.message === "Only image files are allowed") {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }

  next(error);
});

/**
 * @route GET /api/products
 * @desc Get all products
 * @access private (Seller only)
 */
router.get("/seller", authenticateSeller, getAllProductsBySeller);

export default router;
