import { motion } from "framer-motion";
import { Layout, Bell, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Layout,
    title: "Unified Dashboard",
    description: "See all perks in one place - monthly, quarterly, annual benefits tracked automatically.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Never miss expiring benefits with timely reminders and personalized alerts.",
  },
  {
    icon: Zap,
    title: "Quick Redemption",
    description: "One-tap access to Uber, Grubhub, airline portals, and more. Redeem benefits instantly.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Features() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Core Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Maximize your credit card rewards with powerful tools and timely reminders.
          </p>
        </div>

        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="relative overflow-hidden group">
                  <CardContent className="pt-8">
                    <div className="mb-6 inline-block p-3 rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 