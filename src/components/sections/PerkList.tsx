import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Text } from "../ui/Text";
import { Perk, CategoryIconType, categoryIcons } from "./CardData";
import { cn } from "../../lib/utils";

function PerkIcon({ category }: { category: CategoryIconType }) {
  const Icon = categoryIcons[category];
  return <Icon className="w-5 h-5" />;
}

interface PerkListProps {
  perks: Perk[];
}

function formatValue(value: number, period: string) {
  switch (period) {
    case "monthly":
      return `$${value}/mo`;
    case "annual":
      return `$${value}/yr`;
    case "semi_annual":
      return `$${value} (2x/yr)`;
    default:
      return `$${value}`;
  }
}

export function PerkList({ perks }: PerkListProps) {
  const [expandedPerkId, setExpandedPerkId] = useState<string | null>(null);

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      {perks.map((perk) => (
        <motion.div
          key={perk.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => setExpandedPerkId(expandedPerkId === perk.id ? null : perk.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {perk.categories.map(cat => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PerkIcon category={cat} />
                  </motion.div>
                ))}
              </div>
              <Text variant="body" className="font-semibold">{perk.name}</Text>
            </div>
            <div className="flex items-center gap-4">
              <Text variant="body" className="font-bold text-gray-800 whitespace-nowrap">
                {formatValue(perk.value, perk.period)}
              </Text>
              <motion.div
                animate={{ rotate: expandedPerkId === perk.id ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {expandedPerkId === perk.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.2, ease: "easeOut" },
                    opacity: { duration: 0.15, delay: 0.05 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.2, ease: "easeIn" },
                    opacity: { duration: 0.1 }
                  }
                }}
                className="border-t"
              >
                <motion.div 
                  className="p-4 space-y-2"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text variant="body" className="text-gray-600">
                    {perk.description}
                  </Text>
                  {perk.redemptionInstructions && (
                    <Text variant="caption" className="text-gray-500">
                      <span className="font-semibold">How to redeem:</span> {perk.redemptionInstructions}
                    </Text>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
} 