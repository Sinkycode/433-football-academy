import { memo } from "react";
import { motion } from "framer-motion";
import { headerLogo } from "../assets/images";
import { heroFadeIn } from "../constants/animations";

const HeroBackground = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="absolute inset-0 w-full h-full"
  >
    <picture>
      {/* Large screens */}
      <source
        media="(min-width: 1280px)"
        srcSet="/src/assets/images/hero-bg-large.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 1280px)"
        srcSet="/src/assets/images/hero-bg-large.jpg"
        type="image/jpeg"
      />

      {/* Medium screens */}
      <source
        media="(min-width: 768px)"
        srcSet="/src/assets/images/hero-bg-medium.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/src/assets/images/hero-bg-medium.jpg"
        type="image/jpeg"
      />

      {/* Small screens */}
      <source
        srcSet="/src/assets/images/hero-bg-small.webp"
        type="image/webp"
      />

      {/* Fallback */}
      <img
        src="/src/assets/images/hero-bg-small.jpg"
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
    <div className="absolute inset-0 bg-black/50" />
  </motion.div>
));

HeroBackground.displayName = "HeroBackground";

// Memoized logo component
const Logo = memo(() => (
  <motion.img
    initial="hidden"
    animate="visible"
    variants={heroFadeIn}
    transition={{ duration: 0.8, delay: 0.2 }}
    src={headerLogo}
    alt="Academy Logo"
    className="w-40 h-40 md:w-56 md:h-56 object-contain"
    loading="eager"
    fetchPriority="high"
  />
));

Logo.displayName = "Logo";

// Memoized heading component
const Heading = memo(() => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={heroFadeIn}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="flex flex-col gap-4"
  >
    <h1 className="text-4xl md:text-8xl font-montserrat font-bold text-white">
      433 Academy
    </h1>
    <p className="text-xl md:text-2xl font-palanquin text-white-400">
      Developing Tomorrow's Football Stars
    </p>
  </motion.div>
));

Heading.displayName = "Heading";

// Memoized CTA button component
const CTAButton = memo(() => (
  <motion.button
    initial="hidden"
    animate="visible"
    variants={heroFadeIn}
    transition={{ duration: 0.8, delay: 0.6 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-8 bg-coral-red text-white px-8 py-4 rounded-full font-montserrat text-lg 
      hover:bg-opacity-90 transition-all"
    onClick={() => {
      // Add your click handler here
      console.log("CTA clicked");
    }}
  >
    Join Our Academy
  </motion.button>
));

CTAButton.displayName = "CTAButton";

// Main Hero component
const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center">
        <Logo />
        <Heading />
        <CTAButton />
      </div>
    </section>
  );
};

export default memo(Hero);
