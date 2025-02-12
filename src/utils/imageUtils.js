export function getOptimizedImagePaths(imagePath, type = "default") {
  const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/, "");

  const sizes = {
    default: ["default"],
    hero: ["large", "medium", "small"],
    gallery: ["large", "thumbnail"],
    blog: ["large", "small"],
  };

  const selectedSizes = sizes[type] || sizes.default;

  return {
    webp: selectedSizes.map((size) => `${basePath}-${size}.webp`),
    fallback: selectedSizes.map((size) => `${basePath}-${size}.jpg`),
    sizes: selectedSizes,
  };
}
