import { motion } from "framer-motion";

const programs = [
  {
    title: "Elite Development",
    ageGroup: "Ages 13-16",
    description:
      "Advanced training program focusing on technical excellence and tactical understanding.",
    features: [
      "Professional Coaching",
      "Video Analysis",
      "Strength Training",
      "Match Experience",
    ],
    icon: "⚽", // You can replace with actual icon components
    color: "from-[#FF4331] to-[#B42B1E]",
  },
  {
    title: "Youth Academy",
    ageGroup: "Ages 8-12",
    description:
      "Foundation program developing core skills and football fundamentals.",
    features: [
      "Skill Development",
      "Team Play",
      "Physical Literacy",
      "Fun Tournaments",
    ],
    icon: "🌟",
    color: "from-[#3B82F6] to-[#1D4ED8]",
  },
  {
    title: "Pro Pathway",
    ageGroup: "Ages 16-18",
    description:
      "Elite program preparing players for professional opportunities.",
    features: [
      "Pro Trials",
      "Career Guidance",
      "Advanced Tactics",
      "Competition Play",
    ],
    icon: "🏆",
    color: "from-[#10B981] to-[#059669]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Programs = () => {
  return (
    <div className="max-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-20"
      >
        <h2 className="text-4xl font-montserrat font-bold text-black mb-4">
          Our Training <span className="text-coral-red">Programs</span>
        </h2>
        <p className="text-slate-gray text-center max-w-lg">
          Choose the perfect program to kickstart your football journey and
          develop your skills
        </p>
      </motion.div>

      {/* Programs Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {programs.map((program, index) => (
          <motion.div key={index} variants={cardVariants} className="group">
            <div
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${program.color} p-1`}
            >
              <div className="bg-white rounded-xl h-full">
                <div className="p-8">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{program.icon}</span>
                    <div>
                      <h3 className="text-2xl font-montserrat font-bold">
                        {program.title}
                      </h3>
                      <p className="text-coral-red font-semibold">
                        {program.ageGroup}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-gray mb-6">{program.description}</p>

                  {/* Features */}
                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color}`}
                        />
                        <p className="text-sm text-slate-gray">{feature}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-8 w-full py-4 rounded-xl bg-gradient-to-r ${program.color} 
                      text-white font-montserrat text-lg transition-all duration-300
                      hover:shadow-lg`}
                  >
                    Join Program
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Programs;
