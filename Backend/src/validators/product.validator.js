import {body, validationResult} from "express-validator";

function validateProduct(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const createProductValidationRules = [
  body("title")
    .notEmpty().withMessage("Title is required"),
  body("description")
    .notEmpty().withMessage("Description is required"),
  body("priceAmount")
    .notEmpty().withMessage("Price amount is required")
    .isFloat({ gt: 0 }).withMessage("Price amount must be a positive number"),
  body("priceCurrency")
    .optional()
    .isIn(["USD", "EUR", "INR"]).withMessage("Price currency must be USD, EUR, or INR"),
  validateProduct
];