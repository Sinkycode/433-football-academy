import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedSection = ({ children, className, variant, delay = 0 }) => (
  <motion.div
    variants={variant(delay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className={className}
  >
    {children}
  </motion.div>
);

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default AnimatedSection;
