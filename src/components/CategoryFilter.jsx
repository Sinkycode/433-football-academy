import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo } from "react";

const CategoryFilter = memo(
  ({ categories, activeCategory, onCategoryChange, disabled }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            whileHover={!disabled && { scale: 1.05 }}
            whileTap={!disabled && { scale: 0.95 }}
            className={`
            px-6 py-3 rounded-full font-montserrat transition-all
            ${
              activeCategory === category
                ? "bg-coral-red text-white"
                : "bg-pale-blue text-slate-gray hover:bg-coral-red/10"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${disabled && "hover:bg-pale-blue"}
          `}
            disabled={disabled}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";
CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CategoryFilter.defaultProps = {
  disabled: false,
};

export default CategoryFilter;
