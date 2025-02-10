import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { width: 800, suffix: "large" }, // Full size
  { width: 400, suffix: "small" }, // Thumbnail
];

const categories = ["awards", "events"];

async function ensureDirectoryExists(path) {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
}

async function optimizeBlogImages() {
  try {
    // Create optimized directory structure
    const optimizedBaseDir = join(__dirname, "../public/optimized/blogImages");
    await ensureDirectoryExists(optimizedBaseDir);

    for (const category of categories) {
      const sourceDir = join(__dirname, `../public/blogImages/${category}`);
      const optimizedCategoryDir = join(optimizedBaseDir, category);
      await ensureDirectoryExists(optimizedCategoryDir);

      const files = await fs.readdir(sourceDir);

      for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

        const inputPath = join(sourceDir, file);
        const filename = file.replace(/\.[^/.]+$/, "");

        console.log(`Optimizing ${category}/${file}...`);

        for (const size of sizes) {
          const image = sharp(inputPath).resize(
            size.width,
            Math.round(size.width * 0.67),
            {
              fit: "cover",
              position: "center",
            }
          );

          // Generate WebP
          await image
            .clone()
            .webp({ quality: 80 })
            .toFile(
              join(optimizedCategoryDir, `${filename}-${size.suffix}.webp`)
            );

          // Generate JPG
          await image
            .clone()
            .jpeg({ quality: 80, progressive: true })
            .toFile(
              join(optimizedCategoryDir, `${filename}-${size.suffix}.jpg`)
            );
        }
      }
    }

    console.log("✅ Blog images optimized successfully!");
  } catch (error) {
    console.error("❌ Error optimizing images:", error);
    console.error("Error details:", error.message);
  }
}

optimizeBlogImages();
