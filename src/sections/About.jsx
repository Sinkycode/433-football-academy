import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section className="max-container">
      {/* Section Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-10"
      >
        <h2 className="text-4xl font-montserrat font-bold text-coral-red mb-2">
          About Our Academy
        </h2>
        <div className="w-20 h-1 bg-coral-red rounded-full" />
      </motion.div>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Image Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <img
            src="/src/assets/images/academy-training.jpg"
            alt="Academy Training"
            className="w-full h-[600px] object-cover rounded-2xl shadow-3xl"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1"
        >
          <h3 className="text-3xl font-montserrat font-bold text-black mb-6">
            Nurturing Young Talent Since{" "}
            <span className="text-coral-red">2010</span>
          </h3>

          <div className="space-y-6 font-palanquin text-slate-gray">
            <p>
              Our academy is dedicated to developing young football talents
              through a comprehensive training program that focuses on technical
              skills, tactical understanding, and personal growth.
            </p>

            {/* Key Features */}
            <div className="space-y-4">
              {[
                "UEFA Licensed Coaches",
                "State-of-the-art Training Facilities",
                "Personalized Development Plans",
                "Regular Competitive Matches",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-coral-red" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-pale-blue p-6 rounded-xl mt-8">
              <p className="text-lg font-semibold text-black">Our Mission</p>
              <p className="mt-2">
                To create an environment where young players can develop their
                football skills while building character, confidence, and
                leadership qualities that will serve them both on and off the
                field.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-coral-red text-white px-8 py-4 rounded-full 
                font-montserrat text-lg hover:bg-opacity-90 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
