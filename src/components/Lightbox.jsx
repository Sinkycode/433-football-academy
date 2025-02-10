import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { scale: 0.5, opacity: 0 },
};

const CloseButton = memo(({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
      text-white hover:text-coral-red transition-colors duration-200
      bg-black/20 rounded-full backdrop-blur-sm"
    aria-label="Close lightbox"
  >
    <span className="text-2xl leading-none">&times;</span>
  </button>
));

CloseButton.displayName = "CloseButton";

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Lightbox = memo(({ image, onClose }) => {
  if (!image) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label={`Image of ${image.title}`}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <motion.div
          variants={imageVariants}
          className="relative max-w-7xl w-full mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <picture>
            {/* High-quality WebP version */}
            <source srcSet={image.image} type="image/webp" />
            {/* High-quality JPEG fallback */}
            <motion.img
              src={image.imageFallback}
              alt={image.title}
              className="max-w-full max-h-[90vh] object-contain mx-auto
                rounded-lg shadow-2xl"
              loading="eager"
              fetchpriority="high"
              draggable="false"
            />
          </picture>

          {/* Image caption */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
            from-black/80 to-transparent text-white"
          >
            <h3 className="text-xl font-montserrat font-bold">{image.title}</h3>
            <p className="text-sm text-white/80">{image.category}</p>
          </div>
        </motion.div>

        <CloseButton onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
});

Lightbox.displayName = "Lightbox";

Lightbox.propTypes = {
  image: PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageFallback: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Lightbox;
