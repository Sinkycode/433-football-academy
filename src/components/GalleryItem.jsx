import { memo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Define prop types for gallery items
export const GalleryItemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageFallback: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  thumbnailFallback: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["normal", "large"]),
});

// Memoize the overlay content to prevent unnecessary re-renders
const ItemOverlay = memo(({ category, title, isHovered }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isHovered ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent
      flex flex-col justify-end p-6"
  >
    <span className="text-coral-red font-montserrat text-sm mb-2">
      {category}
    </span>
    <h3 className="text-white font-montserrat font-bold text-xl">{title}</h3>
  </motion.div>
));

ItemOverlay.displayName = "ItemOverlay";

ItemOverlay.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

const GalleryItem = memo(({ item, onHover, isHovered, onSelect }) => {
  // Memoize class names
  const containerClassName = `relative rounded-2xl overflow-hidden cursor-pointer
    ${item.size === "large" ? "md:col-span-2 md:row-span-2" : ""}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClassName}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(item)}
    >
      <picture>
        {/* Large screens - WebP */}
        <source
          media="(min-width: 768px)"
          srcSet={item.image}
          type="image/webp"
        />
        {/* Large screens - JPG fallback */}
        <source
          media="(min-width: 768px)"
          srcSet={item.imageFallback}
          type="image/jpeg"
        />
        {/* Small screens - WebP */}
        <source srcSet={item.thumbnail} type="image/webp" />
        {/* Small screens - JPG fallback */}
        <img
          src={item.thumbnailFallback}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500
            hover:scale-110"
          loading="lazy"
          decoding="async"
          sizes={
            item.size === "large"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
        />
      </picture>

      <ItemOverlay
        category={item.category}
        title={item.title}
        isHovered={isHovered}
      />
    </motion.div>
  );
});

GalleryItem.displayName = "GalleryItem";

GalleryItem.propTypes = {
  item: GalleryItemPropType.isRequired,
  onHover: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default GalleryItem;
