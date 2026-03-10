import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Zero-config: loads .env and lets the SDK read CLOUDINARY_URL directly.
dotenv.config();
cloudinary.config();

export default cloudinary;
