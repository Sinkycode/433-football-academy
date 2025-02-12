import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration for different image types
const imageConfigs = {
  gallery: {
    sizes: [
      { width: 800, suffix: "normal" },
      { width: 400, suffix: "thumbnail" },
    ],
    quality: 80,
  },
  blog: {
    sizes: [
      { width: 1200, suffix: "large" },
      { width: 800, suffix: "normal" },
      { width: 400, suffix: "thumbnail" },
    ],
    quality: 80,
  },
};

// Directories to process
const directories = [
  {
    input: "public/galleryImages",
    output: "public/optimized/gallery",
    config: "gallery",
  },
  {
    input: "public/blogImages",
    output: "public/optimized/blog",
    config: "blog",
  },
];

// Helper function to check if directory exists
async function checkDirectory(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Helper function to create directory if it doesn't exist
async function ensureDirectoryExists(path) {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
}

// Process a single image
async function processImage(inputPath, outputDir, filename, config) {
  const { sizes, quality } = imageConfigs[config];

  console.log(`\nProcessing: ${filename}`);
  console.log("Generating sizes:", sizes.map((s) => s.suffix).join(", "));

  for (const size of sizes) {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Only resize if the original is larger than target size
    if (metadata.width > size.width) {
      image.resize(size.width, null, {
        withoutEnlargement: true,
        fit: "contain",
      });
    }

    // Generate WebP
    const webpPath = join(outputDir, `${filename}-${size.suffix}.webp`);
    await image.clone().webp({ quality }).toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    console.log(
      `✓ WebP ${size.suffix}: ${(webpStats.size / 1024).toFixed(2)}KB`
    );

    // Generate JPEG
    const jpgPath = join(outputDir, `${filename}-${size.suffix}.jpg`);
    await image.clone().jpeg({ quality, progressive: true }).toFile(jpgPath);

    const jpgStats = await fs.stat(jpgPath);
    console.log(
      `✓ JPEG ${size.suffix}: ${(jpgStats.size / 1024).toFixed(2)}KB`
    );
  }
}

// Process directory and its subdirectories
async function processDirectory(inputDir, outputDir, config) {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  let processedCount = 0;

  for (const entry of entries) {
    const fullInputPath = join(inputDir, entry.name);

    if (entry.isDirectory()) {
      // Create corresponding output subdirectory
      const subOutputDir = join(outputDir, entry.name);
      await ensureDirectoryExists(subOutputDir);

      // Process subdirectory
      const subCount = await processDirectory(
        fullInputPath,
        subOutputDir,
        config
      );
      processedCount += subCount;
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      // Process image file
      const filename = path.parse(entry.name).name;
      await processImage(fullInputPath, outputDir, filename, config);
      processedCount++;
    }
  }

  return processedCount;
}

// Main function
async function optimizeImages() {
  try {
    console.log("🚀 Starting image optimization...");
    let totalProcessed = 0;

    for (const dir of directories) {
      const inputPath = join(__dirname, "..", dir.input);
      const outputPath = join(__dirname, "..", dir.output);

      // Check if input directory exists
      const inputExists = await checkDirectory(inputPath);
      if (!inputExists) {
        console.log(`\n⚠️ Input directory not found: ${dir.input}`);
        console.log("Skipping this directory...");
        continue;
      }

      console.log(`\n📁 Processing directory: ${dir.input}`);

      // Ensure output directory exists
      await ensureDirectoryExists(outputPath);

      // Process directory and all subdirectories
      const processedCount = await processDirectory(
        inputPath,
        outputPath,
        dir.config
      );
      totalProcessed += processedCount;

      if (processedCount === 0) {
        console.log("No images found in this directory.");
      } else {
        console.log(`Processed ${processedCount} images in ${dir.input}`);
      }
    }

    if (totalProcessed === 0) {
      console.log("\n⚠️ No images were found to process!");
      console.log("Please make sure you have images in these directories:");
      directories.forEach((dir) =>
        console.log(`- ${dir.input} (and subdirectories)`)
      );
    } else {
      console.log(`\n✅ Successfully optimized ${totalProcessed} images!`);
    }
  } catch (error) {
    console.error("\n❌ Error during optimization:", error);
    process.exit(1);
  }
}

// Run the script
optimizeImages();
