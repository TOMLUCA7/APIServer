import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// The v2 SDK automatically uses CLOUDINARY_URL if it's in process.env
// or we can explicitly set it here for clarity
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;
