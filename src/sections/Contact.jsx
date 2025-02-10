import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import SocialLinks from "../components/SocialLinks";

const Contact = () => {
  const contactDetails = [
    {
      icon: "/path-to-location-icon.svg",
      title: "Our Location",
      content: "123 Football Street, Sports City, 12345",
    },
    {
      icon: "/path-to-phone-icon.svg",
      title: "Phone Number",
      content: "+1 (234) 567-8900",
    },
    {
      icon: "/path-to-email-icon.svg",
      title: "Email Address",
      content: "contact@footballacademy.com",
    },
    {
      icon: "/path-to-clock-icon.svg",
      title: "Working Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
  ];

  const socialLinks = [
    {
      name: "facebook",
      url: "https://facebook.com",
      icon: "/src/assets/icons/facebook.svg",
    },
    {
      name: "twitter",
      url: "https://twitter.com",
      icon: "/src/assets/icons/twitter.svg",
    },
    {
      name: "instagram",
      url: "https://instagram.com",
      icon: "/src/assets/icons/instagram.svg",
    },
    {
      name: "youtube",
      url: "https://youtube.com",
      icon: "/src/assets/icons/youtube.svg",
    },
  ];

  return (
    <div className="max-container">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-montserrat font-bold mb-4">
          Get in <span className="text-coral-red">Touch</span>
        </h2>
        <p className="text-slate-gray max-w-lg mx-auto">
          Have questions or want to join our team? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-3xl">
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-8 lg:pl-8">
          {contactDetails.map((detail, index) => (
            <ContactInfo
              key={index}
              icon={detail.icon}
              title={detail.title}
              content={detail.content}
            />
          ))}

          {/* Social Media Links */}
          <SocialLinks socials={socialLinks} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
