import { motion, useScroll, useTransform } from "framer-motion";
import { CreditCard, Bell, Zap, DollarSign, Gift, Calendar } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Unified Dashboard",
    description: "See all your credit card perks in one place - monthly, quarterly, and annual benefits tracked automatically.",
    color: "bg-blue-500/10",
    textColor: "text-blue-600",
    highlight: "$350 avg. monthly benefits",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Never miss expiring benefits with timely reminders. We'll alert you before perks expire.",
    color: "bg-purple-500/10",
    textColor: "text-purple-600",
    highlight: "14 days advance notice",
  },
  {
    icon: Zap,
    title: "Quick Redemption",
    description: "One-tap access to Uber, Grubhub, airline portals, and more. Redeem benefits instantly.",
    color: "bg-amber-500/10",
    textColor: "text-amber-600",
    highlight: "2-click redemption",
  },
  {
    icon: DollarSign,
    title: "Value Tracking",
    description: "Track the real value of your card benefits and see exactly how much you're saving.",
    color: "bg-green-500/10",
    textColor: "text-green-600",
    highlight: "100% value utilized",
  },
  {
    icon: Gift,
    title: "Bonus Alerts",
    description: "Get notified about special promotions and limited-time offers from your card issuers.",
    color: "bg-red-500/10",
    textColor: "text-red-600",
    highlight: "Never miss an offer",
  },
  {
    icon: Calendar,
    title: "Annual Fee Analysis",
    description: "See if your cards are worth their annual fees with our smart ROI calculator.",
    color: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    highlight: "Data-driven decisions",
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.8, 0.8, 1]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--brand)_12%,transparent_12.5%,transparent_87%,var(--brand)_87.5%,var(--brand))] opacity-[0.025]" style={{ backgroundSize: '10px 10px' }} />
      </div>

      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand/5 text-brand text-sm font-medium">
              Powerful Features
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
          >
            Your benefits, simplified
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Stop tracking benefits manually. Let Credify do the heavy lifting while you enjoy the perks.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          style={{ opacity, scale }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group cursor-pointer"
              >
                <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} ${feature.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  {/* Highlight Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-sm text-gray-600">
                    <span className="mr-2">→</span>
                    {feature.highlight}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/20 via-accent/20 to-brand/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 