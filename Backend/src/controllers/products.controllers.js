import productModel from "../models/products.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const files = Array.isArray(req.files) ? req.files : [];

    if (files.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required",
        success: false,
      });
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });

        return { url: uploadedFile.url };
      }),
    );

    const products = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR",
      },
      images,
      seller: seller._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.error("createProduct error:", error);

    if (error?.statusCode && Number.isInteger(error.statusCode)) {
      return res.status(error.statusCode).json({
        message: error?.message || "Image upload failed",
        success: false,
      });
    }

    res.status(500).json({
      message: "Failed to create product",
      success: false,
    });
  }
}

export async function getAllProductsBySeller(req, res) {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    products,
  });
}
