import { motion, useInView } from "framer-motion";
import { Text } from "./Text";
import { useEffect, useRef, useState } from "react";

export interface FloatingStatsProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

function CountingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract numeric value and unit (if any)
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const unit = value.replace(/[0-9.]/g, '');
    
    let startTimestamp: number;
    const duration = 2000; // 2 seconds animation
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const currentValue = Math.floor(progress * numericValue);
      setDisplayValue(`${currentValue}${unit}`);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value); // Ensure we end up with the exact target value
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value]);
  
  return <span ref={ref}>{displayValue}</span>;
}

export function FloatingStats({ stats }: FloatingStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <Text variant="h3" as="p" className="mb-2 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              <CountingNumber value={stat.value} />
            </Text>
            <Text variant="caption" className="text-gray-600">
              {stat.label}
            </Text>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
} 