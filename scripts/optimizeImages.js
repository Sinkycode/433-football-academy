import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define input and output paths
const inputPath = join(__dirname, "../src/assets/images/hero-bg.jpg");
const outputPath = join(__dirname, "../src/assets/images/hero-bg.webp");

// Create different sizes for responsive images
async function optimizeHeroImage() {
  try {
    // Generate WebP version
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

    // Generate responsive sizes
    const sizes = [
      { width: 1920, suffix: "large" },
      { width: 1280, suffix: "medium" },
      { width: 640, suffix: "small" },
    ];

    for (const size of sizes) {
      await sharp(inputPath)
        .resize(size.width)
        .webp({ quality: 80 })
        .toFile(
          join(__dirname, `../src/assets/images/hero-bg-${size.suffix}.webp`)
        );

      // Also create JPG fallbacks
      await sharp(inputPath)
        .resize(size.width)
        .jpeg({ quality: 80, progressive: true })
        .toFile(
          join(__dirname, `../src/assets/images/hero-bg-${size.suffix}.jpg`)
        );
    }

    console.log("✅ Hero background images optimized successfully!");
  } catch (error) {
    console.error("❌ Error optimizing images:", error);
    console.error("Error details:", error.message);
  }
}

optimizeHeroImage();
