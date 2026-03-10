import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Normalize multipart fields before validation to avoid type errors.
const normalizeMultipart = (req, res, next) => {
  const recipe = req.body;
  if (typeof recipe.cookingTime === "string")
    recipe.cookingTime = Number(recipe.cookingTime);
  if (typeof recipe.servings === "string")
    recipe.servings = Number(recipe.servings);
  if (typeof recipe.ingredients === "string") {
    try {
      recipe.ingredients = JSON.parse(recipe.ingredients);
    } catch (e) {}
  }
  if (typeof recipe.instructions === "string") {
    try {
      recipe.instructions = JSON.parse(recipe.instructions);
    } catch (e) {}
  }
  next();
};

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: process.env.CLOUDINARY_FOLDER || "recipe_uploads",
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res
          .status(500)
          .json({ error: "Cloudinary upload failed", details: error.message });
      }
      req.file.path = result.secure_url;
      next();
    },
  );

  stream.end(req.file.buffer);
};

export { upload, normalizeMultipart, uploadToCloudinary };
