import PropTypes from "prop-types";

const Skeleton = ({ className = "", variant = "rectangular" }) => {
  const baseClasses = "animate-pulse bg-gray-200";

  const variantClasses = {
    rectangular: "",
    circular: "rounded-full",
    text: "rounded",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["rectangular", "circular", "text"]),
};

export default Skeleton;
