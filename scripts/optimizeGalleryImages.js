import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const categories = ["trainings", "matches", "events", "awards"];
const sizes = [
  { width: 800, suffix: "normal" }, // For normal size items
  { width: 1200, suffix: "large" }, // For large size items
  { width: 400, suffix: "thumbnail" }, // For thumbnails
];

async function ensureDirectoryExists(path) {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, filename, size) {
  const webpPath = join(outputDir, `${filename}-${size.suffix}.webp`);
  const jpgPath = join(outputDir, `${filename}-${size.suffix}.jpg`);

  await Promise.all([
    // Create WebP version
    sharp(inputPath).resize(size.width).webp({ quality: 80 }).toFile(webpPath),

    // Create JPG version
    sharp(inputPath)
      .resize(size.width)
      .jpeg({ quality: 80, progressive: true })
      .toFile(jpgPath),
  ]);
}

async function optimizeGalleryImages() {
  try {
    // Create optimized directory if it doesn't exist
    const optimizedDir = join(__dirname, "../public/optimized");
    await ensureDirectoryExists(optimizedDir);

    for (const category of categories) {
      const categoryDir = join(optimizedDir, category);
      await ensureDirectoryExists(categoryDir);

      const sourceDir = join(__dirname, `../public/${category}`);
      const files = await fs.readdir(sourceDir);

      for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

        const inputPath = join(sourceDir, file);
        const filename = file.replace(/\.[^/.]+$/, ""); // Remove extension

        console.log(`Optimizing ${category}/${file}...`);

        // Process all sizes
        await Promise.all(
          sizes.map((size) =>
            optimizeImage(inputPath, categoryDir, filename, size)
          )
        );
      }
    }

    console.log("✅ Gallery images optimized successfully!");
  } catch (error) {
    console.error("❌ Error optimizing images:", error);
  }
}

optimizeGalleryImages();
