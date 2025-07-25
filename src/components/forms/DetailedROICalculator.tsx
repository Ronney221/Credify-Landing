import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCardData } from "@/hooks/useCardData";
import { PerkList } from "../sections/PerkList";

const portfolioTiers = [
  {
    title: "Single Premium Card",
    description: "Chase Sapphire Preferred, Amex Gold, etc.",
    annualFeeRange: "$95-$250",
    utilizationRate: 25,
    credifyRate: 90
  },
  {
    title: "Premium Portfolio", 
    description: "Amex Platinum, Chase Sapphire Reserve, etc.",
    annualFeeRange: "$400-$700",
    utilizationRate: 20,
    credifyRate: 92
  },
  {
    title: "Multi-Card Strategy",
    description: "3+ premium cards with strategic benefits",
    annualFeeRange: "$1,000-$2,000+",
    utilizationRate: 15,
    credifyRate: 95
  }
];

interface DetailedROICalculatorProps {
  onClose?: () => void;
}

export function DetailedROICalculator({ onClose }: DetailedROICalculatorProps) {
  const [step, setStep] = useState<'selection' | 'results' | 'email'>('selection');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);
  const [calculationResult, setCalculationResult] = useState<{
    card: any;
    portfolioTier: typeof portfolioTiers[0];
    totalAnnualValue: number;
    typicalValue: number;
    credifyValue: number;
    missedValue: number;
    netROI: number;
  } | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { trackEvent } = useAnalytics();
  const { cards, loading, error } = useCardData();

  const calculateAnnualValue = (value: number, period: string) => {
    switch (period) {
      case "monthly":
        return value * 12;
      case "semi_annual":
        return value * 2;
      case "annual":
      default:
        return value;
    }
  };

  const getPortfolioTier = (annualFee: number) => {
    if (annualFee <= 250) return portfolioTiers[0];
    if (annualFee <= 700) return portfolioTiers[1];
    return portfolioTiers[2];
  };

  const calculateROI = (cardIndex: number) => {
    const card = cards[cardIndex];
    const portfolioTier = getPortfolioTier(card.annualFee);
    
    const totalAnnualValue = card.benefits.reduce((acc, perk) => {
      return acc + calculateAnnualValue(perk.value, perk.period);
    }, 0);

    const typicalValue = Math.round(totalAnnualValue * (portfolioTier.utilizationRate / 100));
    const credifyValue = Math.round(totalAnnualValue * (portfolioTier.credifyRate / 100));
    const missedValue = credifyValue - typicalValue;
    const netROI = credifyValue - card.annualFee;

    const result = {
      card,
      portfolioTier,
      totalAnnualValue,
      typicalValue,
      credifyValue,
      missedValue,
      netROI
    };

    setCalculationResult(result);
    setStep('results');

    // Track the calculation
    trackEvent({
      name: 'detailed_roi_calculation',
      props: {
        card_name: card.name,
        annual_fee: card.annualFee,
        total_benefits: totalAnnualValue,
        missed_value: missedValue,
        net_roi: netROI
      }
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !calculationResult) return;

    setIsSubmittingEmail(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email,
            platform: 'detailed_roi_calculator',
            card_type: calculationResult.card.name.toLowerCase().replace(/\s+/g, '-')
          }
        ]);

      if (error) throw error;

      trackEvent({
        name: 'detailed_roi_email_signup',
        props: {
          card_name: calculationResult.card.name,
          email_domain: email.split('@')[1],
          missed_value: calculationResult.missedValue
        }
      });

      setEmailSent(true);
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  if (step === 'selection') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <Text variant="h3" className="mb-2">🧮 Detailed Credit Card ROI Calculator</Text>
          <Text variant="body" className="text-gray-600">
            Get a comprehensive analysis of your card's benefit potential - no signup required
          </Text>
        </div>

        {loading && (
          <div className="text-center py-8">
            <Text variant="body" className="text-gray-600">Loading credit cards...</Text>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <Text variant="body" className="text-red-600 mb-4">{error}</Text>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            <Label className="text-base font-medium">Select your credit card:</Label>
            {cards.map((card, index) => (
            <button
              key={card.name}
              onClick={() => {
                setSelectedCardIndex(index);
                calculateROI(index);
              }}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div>
                    <Text variant="body" className="font-medium group-hover:text-green-600">
                      {card.name}
                    </Text>
                    <Text variant="caption" className="text-gray-500">
                      ${card.annualFee} annual fee
                    </Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text variant="caption" className="text-green-600 font-medium">
                    {card.benefits.length} benefits
                  </Text>
                  <Text variant="tiny" className="text-gray-400">
                    tracked
                  </Text>
                </div>
              </div>
            </button>
          ))}
          </div>
        )}
        
        {!loading && !error && (
          <Text variant="tiny" className="text-center text-gray-500 mt-4">
            🔒 Click any card for instant detailed analysis
          </Text>
        )}
      </motion.div>
    );
  }

  if (step === 'results' && calculationResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <Text variant="h3" className="mb-2">📊 Your Complete ROI Analysis</Text>
          <Text variant="body" className="text-gray-600">
            Detailed breakdown for your {calculationResult.card.name}
          </Text>
        </div>

        {/* Portfolio Context */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <Text variant="body" className="font-medium text-blue-800 mb-1">
            Portfolio Category: {calculationResult.portfolioTier.title}
          </Text>
          <Text variant="caption" className="text-blue-600">
            {calculationResult.portfolioTier.description} • Fee Range: {calculationResult.portfolioTier.annualFeeRange}
          </Text>
        </div>

        {/* ROI Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Text variant="body" className="text-gray-600 mb-1">Annual Fee</Text>
            <Text variant="h4" className="text-red-600">-${calculationResult.card.annualFee}</Text>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <Text variant="body" className="text-gray-600 mb-1">You Typically Get</Text>
            <Text variant="h4" className="text-orange-600">${calculationResult.typicalValue}</Text>
            <Text variant="tiny" className="text-gray-500">{calculationResult.portfolioTier.utilizationRate}% usage rate</Text>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Text variant="body" className="text-gray-600 mb-1">With Credify</Text>
            <Text variant="h4" className="text-green-600">${calculationResult.credifyValue}</Text>
            <Text variant="tiny" className="text-gray-500">{calculationResult.portfolioTier.credifyRate}% usage rate</Text>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
            <Text variant="body" className="text-gray-600 mb-1">Net ROI</Text>
            <Text variant="h4" className={calculationResult.netROI > 0 ? "text-blue-600" : "text-red-600"}>
              {calculationResult.netROI > 0 ? '+' : ''}${calculationResult.netROI}
            </Text>
            <Text variant="tiny" className="text-gray-500">annual value</Text>
          </div>
        </div>

        {/* Missed Value Highlight */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 text-center mb-6">
          <Text variant="h3" className="text-orange-700 mb-2">
            You're Missing ${calculationResult.missedValue}/year
          </Text>
          <Text variant="body" className="text-gray-600">
            Most {calculationResult.portfolioTier.title.toLowerCase()} holders only use {calculationResult.portfolioTier.utilizationRate}% of available benefits. 
            Credify helps you reach {calculationResult.portfolioTier.credifyRate}% utilization.
          </Text>
        </div>

        {/* Detailed Benefits */}
        <div className="mb-6">
          <Text variant="h4" className="mb-4">Your {calculationResult.card.name} Benefits:</Text>
          <PerkList perks={calculationResult.card.benefits} />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sticky bottom-0 bg-white pt-4 border-t">
          <Button
            onClick={() => window.open('https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790', '_blank')}
            className="w-full"
          >
            Get Credify Now - Recover Your ${calculationResult.missedValue}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setStep('email')}
            className="w-full"
          >
            📧 Email Me This Analysis + Optimization Tips
          </Button>
          
          <button
            onClick={() => setStep('selection')}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            ← Try Another Card
          </button>
        </div>
      </motion.div>
    );
  }

  if (step === 'email') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        {emailSent ? (
          <div className="text-center py-8">
            <Text variant="h4" className="text-green-600 mb-2">📧 Complete Analysis Sent!</Text>
            <Text variant="body" className="text-gray-600 mb-4">
              Check your email for your detailed {calculationResult?.card.name} optimization guide with specific redemption strategies to recover your ${calculationResult?.missedValue}.
            </Text>
            <div className="space-y-3">
              <Button
                onClick={() => window.open('https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790', '_blank')}
                className="w-full"
              >
                Get Credify Now
              </Button>
              {onClose && (
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <Text variant="h3" className="mb-2">📧 Get Your Complete Analysis</Text>
              <Text variant="body" className="text-gray-600">
                We'll send you a comprehensive optimization guide with specific redemption strategies for your {calculationResult?.card.name}
              </Text>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="w-full"
                >
                  {isSubmittingEmail ? 'Sending...' : 'Send My Complete Analysis 📊'}
                </Button>
                
                <button
                  type="button"
                  onClick={() => setStep('results')}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Results
                </button>
              </div>

              <Text variant="tiny" className="text-center text-gray-500">
                🔒 No spam, unsubscribe anytime. Just actionable strategies to maximize your card benefits.
              </Text>
            </form>
          </>
        )}
      </motion.div>
    );
  }

  return null;
}