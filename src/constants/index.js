import { SOCIAL_ICONS } from "./icons";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about-us", label: "About club" },
  { href: "#programs", label: "Programs" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" },
  { href: "#contacts", label: "Contacts" },
];

// Add to your existing constants
export const footerLinks = {
  quickLinks: [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Gallery", url: "/gallery" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" },
  ],
  programs: [
    { name: "Youth Academy", url: "/programs/youth" },
    { name: "Elite Training", url: "/programs/elite" },
    { name: "Summer Camps", url: "/programs/camps" },
    { name: "Private Coaching", url: "/programs/private" },
    { name: "Team Training", url: "/programs/team" },
  ],
};

export const socialMedia = [
  {
    name: "facebook",
    url: "https://facebook.com",
    icon: SOCIAL_ICONS.facebook,
  },
  {
    name: "twitter",
    url: "https://twitter.com",
    icon: SOCIAL_ICONS.twitter,
  },
  {
    name: "instagram",
    url: "https://instagram.com",
    icon: SOCIAL_ICONS.instagram,
  },
  {
    name: "youtube",
    url: "https://youtube.com",
    icon: SOCIAL_ICONS.youtube,
  },
];
