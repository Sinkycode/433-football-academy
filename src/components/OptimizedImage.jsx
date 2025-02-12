import { memo } from "react";
import PropTypes from "prop-types";

const OptimizedImage = memo(
  ({ src, alt, className = "", loading = "lazy", onClick, style }) => {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        onClick={onClick}
        style={style}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default OptimizedImage;
