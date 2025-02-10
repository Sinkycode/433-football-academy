import PropTypes from "prop-types";

const FooterColumn = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-white font-montserrat text-xl font-semibold">
      {title}
    </h4>
    {children}
  </div>
);

FooterColumn.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FooterColumn;
