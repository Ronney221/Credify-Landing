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
    <div className="space-y-2">
      {perks.map((perk) => (
        <div
          key={perk.id}
          className="border rounded-lg overflow-hidden bg-white"
        >
          <button
            onClick={() => setExpandedPerkId(expandedPerkId === perk.id ? null : perk.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {perk.categories.map(cat => (
                  <PerkIcon key={cat} category={cat} />
                ))}
              </div>
              <Text variant="body" className="font-semibold">{perk.name}</Text>
            </div>
            <div className="flex items-center gap-4">
              <Text variant="body" className="font-bold text-gray-800 whitespace-nowrap">
                {formatValue(perk.value, perk.period)}
              </Text>
              <ChevronDown
                className={cn(
                  "w-5 h-5 transition-transform",
                  expandedPerkId === perk.id ? "rotate-180" : ""
                )}
              />
            </div>
          </button>
          <AnimatePresence>
            {expandedPerkId === perk.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t"
              >
                <div className="p-4 space-y-2">
                  <Text variant="body" className="text-gray-600">
                    {perk.description}
                  </Text>
                  {perk.redemptionInstructions && (
                    <Text variant="caption" className="text-gray-500">
                      <span className="font-semibold">How to redeem:</span> {perk.redemptionInstructions}
                    </Text>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
} 