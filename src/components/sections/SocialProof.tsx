import { motion } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { Award, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    value: "$2.4M+",
    label: "Benefits Tracked",
    description: "Total value monitored for our users",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    value: "50K+",
    label: "Active Users",
    description: "Growing community of savvy cardholders",
    icon: Users,
    color: "text-blue-500",
  },
  {
    value: "98%",
    label: "User Satisfaction",
    description: "Based on our latest user survey",
    icon: Award,
    color: "text-purple-500",
  },
];

const cardIssuers = [
  { name: "American Express", logo: "/assets/cards/amex_plat.avif" },
  { name: "Chase", logo: "/assets/cards/chase_sapphire_reserve.png" },
  { name: "Capital One", logo: "/assets/cards/venture_x.avif" },
  { name: "Citi", logo: "/assets/cards/citi_prestige.jpeg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function SocialProof() {
  return (
    <div className="container px-4 mx-auto">
      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 mb-24"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 ${stat.color} flex items-center justify-center mb-6`}>
                  <Icon size={24} />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="font-medium text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Card Issuers */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-8"
        >
          Trusted by cardholders from leading issuers
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12"
        >
          {cardIssuers.map((issuer) => (
            <motion.div
              key={issuer.name}
              variants={itemVariants}
              className="relative w-24 h-12"
            >
              <BlurImage
                src={issuer.logo}
                alt={issuer.name}
                width={96}
                height={48}
                className="object-contain w-full h-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 