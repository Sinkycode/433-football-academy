import PropTypes from "prop-types";

const SocialLinks = ({ socials }) => (
  <div className="pt-8">
    <h4 className="font-montserrat font-semibold mb-4">Follow Us</h4>
    <div className="flex gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <social.icon size={30} color="#000" />
        </a>
      ))}
    </div>
  </div>
);

SocialLinks.propTypes = {
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SocialLinks;
