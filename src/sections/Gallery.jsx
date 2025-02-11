import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "../constants/galleryImages";
import GalleryItem from "../components/GalleryItem";
import GalleryItemSkeleton from "../components/GalleryItemSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import Lightbox from "../components/Lightbox";
import { fadeIn, staggerContainer } from "../constants/animations";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Memoize categories array
  const categories = useMemo(
    () => ["All", "Training", "Matches", "Events", "Awards"],
    []
  );

  // Memoize filtered images
  const filteredImages = useMemo(() => {
    return images.filter(
      (item) => activeCategory === "All" || item.category === activeCategory
    );
  }, [images, activeCategory]);

  // Memoize callback functions
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setLoading(true);
    // Simulate filtering delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleHoverImage = useCallback((id) => {
    setHoveredImage(id);
  }, []);

  const handleSelectImage = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Use AbortController for cleanup
  useEffect(() => {
    const abortController = new AbortController();

    const fetchImages = async () => {
      setLoading(true);
      try {
        // Simulate API call with abort signal
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 1500);
          abortController.signal.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error("Aborted"));
          });
        });
        setImages(galleryImages);
      } catch (error) {
        if (error.message !== "Aborted") {
          console.error("Failed to fetch images:", error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      abortController.abort();
    };
  }, []);

  // Memoize skeleton array
  const skeletonArray = useMemo(() => Array(6).fill(null), []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-container"
    >
      {/* Header */}
      <motion.div variants={fadeIn("up")} className="text-center mb-12">
        <h2 className="text-4xl font-montserrat font-bold mb-4">
          Our <span className="text-coral-red">Gallery</span>
        </h2>
        <p className="text-slate-gray max-w-lg mx-auto">
          Capturing moments of excellence, dedication, and triumph
        </p>
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        disabled={loading}
      />

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {loading
          ? // Show skeletons while loading
            skeletonArray.map((_, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                initial="hidden"
                animate="visible"
              >
                <GalleryItemSkeleton />
              </motion.div>
            ))
          : filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeIn("up", 0.1 * index)}
                initial="hidden"
                animate="visible"
              >
                <GalleryItem
                  item={item}
                  onHover={handleHoverImage}
                  isHovered={hoveredImage === item.id}
                  onSelect={handleSelectImage}
                />
              </motion.div>
            ))}
      </motion.div>

      {/* Empty State */}
      {!loading && filteredImages.length === 0 && (
        <motion.div variants={fadeIn("up")} className="text-center py-12">
          <p className="text-slate-gray text-lg">No images found.</p>
        </motion.div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={handleCloseLightbox} />
      )}
    </motion.div>
  );
};

export default Gallery;
