import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Text } from "../ui/Text";
import { CategoryIconType, categoryIcons } from "./CardData";
import { cn } from "../../lib/utils";

function PerkIcon({ category }: { category: CategoryIconType }) {
  const Icon = categoryIcons[category];
  return <Icon className="w-5 h-5" />;
}

// Updated interface to match database benefit structure
interface DatabaseBenefit {
  name: string;
  value: number;
  period: 'monthly' | 'semi_annual' | 'annual' | 'quarterly';
  description: string;
  redemption_instructions: string;
  categories: string[];
}

interface PerkListProps {
  perks: DatabaseBenefit[];
}

function formatValue(value: number, period: string) {
  // Round to nearest dollar
  const roundedValue = Math.round(value);
  
  switch (period.toLowerCase()) {
    case "monthly":
      return `$${roundedValue}/mo`;
    case "annual":
      return `$${roundedValue}/yr`;
    case "semi_annual":
      return `$${roundedValue} (2x/yr)`;
    default:
      return `$${roundedValue}`;
  }
}

// Helper function to get period weight for sorting
function getPeriodWeight(period: string): number {
  switch (period.toLowerCase()) {
    case "monthly":
      return 1;
    case "quarterly":
      return 3;
    case "semi_annual":
      return 6;
    case "annual":
      return 12;
    default:
      return 99; // Put unknown periods at the end
  }
}

// Helper function to calculate annual value
function getAnnualValue(value: number, period: string): number {
  // Round to nearest dollar
  const roundedValue = Math.round(value);
  
  switch (period.toLowerCase()) {
    case "monthly":
      return roundedValue * 12;
    case "quarterly":
      return roundedValue * 4;
    case "semi_annual":
      return roundedValue * 2;
    case "annual":
      return roundedValue;
    default:
      return roundedValue;
  }
}

// Helper function to determine if we should show annual value
function shouldShowAnnualValue(period: string): boolean {
  return period.toLowerCase() !== "annual";
}

export function PerkList({ perks }: PerkListProps) {
  // Sort perks by period (shortest first) and then by value (highest first)
  const sortedPerks = [...perks].sort((a, b) => {
    const periodWeightA = getPeriodWeight(a.period);
    const periodWeightB = getPeriodWeight(b.period);
    
    // First sort by period
    if (periodWeightA !== periodWeightB) {
      return periodWeightA - periodWeightB;
    }
    
    // If periods are the same, sort by annual value (highest first)
    const annualValueA = getAnnualValue(a.value, a.period);
    const annualValueB = getAnnualValue(b.value, b.period);
    return annualValueB - annualValueA;
  });

  // Initialize with first perk expanded
  const [expandedPerkId, setExpandedPerkId] = useState<string | null>(null);

  // Set first perk as expanded only on initial mount
  useEffect(() => {
    if (sortedPerks.length > 0 && expandedPerkId === null) {
      setExpandedPerkId(sortedPerks[0].name); // Use name as ID since database doesn't have id field
    }
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      {sortedPerks.map((perk, index) => (
        <motion.div
          key={`${perk.name}-${index}`} // Use name and index as key since no id field
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => setExpandedPerkId(expandedPerkId === perk.name ? null : perk.name)}
            className={cn(
              "w-full p-4 flex items-center justify-between transition-colors duration-200",
              expandedPerkId === perk.name ? "bg-gray-50" : "hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {/* Remove duplicate categories and map unique ones */}
                {[...new Set(perk.categories)].map(cat => (
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
              <div className="text-right">
                <Text variant="body" className="font-bold text-gray-800 whitespace-nowrap">
                  {formatValue(perk.value, perk.period)}
                </Text>
                {shouldShowAnnualValue(perk.period) && (
                  <Text variant="tiny" className="text-gray-500">
                    ${getAnnualValue(perk.value, perk.period)}/yr
                  </Text>
                )}
              </div>
              <motion.div
                animate={{ rotate: expandedPerkId === perk.name ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {expandedPerkId === perk.name && (
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
                  {perk.redemption_instructions && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Text variant="caption" className="text-green-800">
                        <span className="font-semibold">💡 Credify Hack:</span> {perk.redemption_instructions}
                      </Text>
                    </div>
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