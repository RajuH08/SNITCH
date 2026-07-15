import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  next();
}

export const validateRegisterUser = [
  body("email").isEmail().withMessage("Invalid email format"),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a 10-digit number"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("Full name must be between 3 and 15 characters long"),
  body("isSeller")
    .isBoolean()
    .withMessage("isSeller must be a boolean value"),

  validateRequest,
];
