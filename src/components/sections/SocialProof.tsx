import { motion, useScroll, useTransform } from "framer-motion";
import { BlurImage } from "../ui/BlurImage";
import { Award, TrendingUp, Users } from "lucide-react";

const cardIssuers = [
  {
    name: "American Express",
    logo: "/assets/cards/amex_plat.avif",
    description: "Premium travel rewards",
  },
  {
    name: "Chase",
    logo: "/assets/cards/chase_sapphire_reserve.png",
    description: "Ultimate rewards program",
  },
  {
    name: "Capital One",
    logo: "/assets/cards/venture_x.avif",
    description: "Miles & travel benefits",
  },
  {
    name: "Citi",
    logo: "/assets/cards/citi_prestige.jpeg",
    description: "ThankYou rewards",
  },
];

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

const awards = [
  'Featured in TechCrunch\'s "Top Fintech Apps to Watch"',
  'Best Personal Finance Innovation 2024',
  '4.9/5 App Store Rating',
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function SocialProof() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-brand/5 blur-3xl" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-accent/5 blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        {/* Stats Section */}
        <motion.div
          style={{ scale, opacity }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="font-medium text-gray-900 mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Card Issuers */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4"
          >
            Trusted by Leading Card Issuers
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
          >
            {cardIssuers.map((issuer) => (
              <motion.div
                key={issuer.name}
                variants={item}
                className="group relative"
              >
                <div className="relative w-full aspect-[3/2] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <BlurImage
                    src={issuer.logo}
                    alt={issuer.name}
                    width={200}
                    height={133}
                    className="object-contain w-full h-full filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  
                  {/* Hover Tooltip */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900/90 text-white text-sm rounded-lg px-3 py-2">
                      {issuer.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {awards.map((award, index) => (
              <div
                key={award}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm text-gray-600"
              >
                {index === 0 && <Award className="w-4 h-4 text-brand" />}
                {index === 1 && <TrendingUp className="w-4 h-4 text-accent" />}
                {index === 2 && (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
                <span>{award}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 