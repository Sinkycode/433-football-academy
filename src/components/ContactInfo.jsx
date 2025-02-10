import PropTypes from "prop-types";

const ContactInfo = ({ icon, title, content }) => (
  <div className="flex gap-4 items-start">
    <div className="bg-coral-red rounded-full p-3">
      <img src={icon} alt={title} className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-montserrat font-semibold mb-1">{title}</h4>
      <p className="text-slate-gray">{content}</p>
    </div>
  </div>
);

ContactInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ContactInfo;
