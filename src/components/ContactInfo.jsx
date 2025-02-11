import PropTypes from "prop-types";

const ContactInfo = ({ icon: Icon, title, content }) => (
  <div className="flex gap-4 items-start">
    <div className="bg-coral-red rounded-full p-3">
      <Icon size={24} className="text-white" />
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
