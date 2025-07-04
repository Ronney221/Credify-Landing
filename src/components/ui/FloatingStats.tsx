import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const allStats = [
  { 
    type: "stat",
    label: "Active Benefits", 
    value: "12", 
    color: "text-brand" 
  },
  { 
    type: "stat",
    label: "Monthly Savings", 
    value: "$324", 
    color: "text-green-500" 
  },
  { 
    type: "notification",
    label: "Uber Credit Available", 
    value: "$15", 
    color: "text-blue-500",
    icon: "🚗",
    daysLeft: "3 days left"
  },
  { 
    type: "stat",
    label: "Total Value", 
    value: "$2,314", 
    color: "text-purple-500" 
  },
  { 
    type: "notification",
    label: "Grubhub Credit", 
    value: "$10", 
    color: "text-orange-500",
    icon: "🍔",
    daysLeft: "5 days left"
  },
  { 
    type: "stat",
    label: "Benefits Redeemed", 
    value: "23", 
    color: "text-indigo-500" 
  },
  { 
    type: "notification",
    label: "Airline Credit", 
    value: "$200", 
    color: "text-pink-500",
    icon: "✈️",
    daysLeft: "Annual credit available"
  },
  { 
    type: "stat",
    label: "User Rating", 
    value: "4.9", 
    color: "text-yellow-500" 
  },
  { 
    type: "notification",
    label: "Hotel Credit", 
    value: "$200", 
    color: "text-cyan-500",
    icon: "🏨",
    daysLeft: "Book by Dec 31"
  },
  { 
    type: "stat",
    label: "Avg. Monthly Value", 
    value: "$212", 
    color: "text-emerald-500" 
  }
];

interface FloatingStatsProps {
  count?: number;
  className?: string;
  startIndex?: number;
}

export function FloatingStats({ count = 3, className = "", startIndex = 0 }: FloatingStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Take a slice of stats based on count and startIndex
  const stats = allStats.slice(startIndex, startIndex + count);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {stats.map((stat, index) => {
        // Create unique scroll-based animations for each stat
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, (index % 2 === 0 ? 100 : -100) * (1 + index * 0.2)]
        );
        const x = useTransform(
          scrollYProgress,
          [0, 1],
          [0, (index % 3 === 0 ? 50 : index % 3 === 1 ? -50 : 0) * (1 + index * 0.1)]
        );

        return (
          <motion.div
            key={stat.label}
            style={{ y, x }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + index * 0.1,
              duration: 0.5,
            }}
            className={`absolute bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm bg-white/90
              ${index % 3 === 0 ? 'left-0' : ''}
              ${index % 3 === 1 ? 'left-1/2 -translate-x-1/2' : ''}
              ${index % 3 === 2 ? 'right-0' : ''}
              ${index < 3 ? 'top-0' : ''}
              ${index >= 3 && index < 6 ? 'top-1/2 -translate-y-1/2' : ''}
              ${index >= 6 ? 'bottom-0' : ''}
              hover:scale-105 transition-transform duration-300
            `}
          >
            {stat.type === "notification" ? (
              <div className="flex items-start gap-3">
                <div className="text-2xl">{(stat as any).icon}</div>
                <div>
                  <div className="text-sm font-medium whitespace-nowrap">{stat.label}</div>
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{(stat as any).daysLeft}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm font-medium whitespace-nowrap">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
} 