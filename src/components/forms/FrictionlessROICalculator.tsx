import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAnalytics } from "@/hooks/useAnalytics";

const cardData = {
  "amex-platinum": { name: "Amex Platinum", annualFee: 695, potentialBenefits: 1200 },
  "chase-sapphire-reserve": { name: "Chase Sapphire Reserve", annualFee: 550, potentialBenefits: 950 },
  "amex-gold": { name: "Amex Gold", annualFee: 250, potentialBenefits: 600 },
  "capital-one-venture-x": { name: "Capital One Venture X", annualFee: 395, potentialBenefits: 800 },
  "citi-prestige": { name: "Citi Prestige", annualFee: 495, potentialBenefits: 850 },
  "chase-sapphire-preferred": { name: "Chase Sapphire Preferred", annualFee: 95, potentialBenefits: 400 },
  "other": { name: "Other Premium Card", annualFee: 400, potentialBenefits: 700 }
};

interface FrictionlessROICalculatorProps {
  onClose?: () => void;
}

export function FrictionlessROICalculator({ onClose }: FrictionlessROICalculatorProps) {
  const [step, setStep] = useState<'selection' | 'results' | 'email'>('selection');
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<{
    cardName: string;
    annualFee: number;
    potentialBenefits: number;
    netValue: number;
    missedValue: number;
  } | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { trackEvent } = useAnalytics();

  const calculateROI = (cardKey: string) => {
    const card = cardData[cardKey as keyof typeof cardData];
    const missedValue = Math.floor(card.potentialBenefits * 0.7); // 70% typically missed
    
    const result = {
      cardName: card.name,
      annualFee: card.annualFee,
      potentialBenefits: card.potentialBenefits,
      netValue: card.potentialBenefits - card.annualFee,
      missedValue: missedValue
    };

    setCalculationResult(result);
    setStep('results');

    // Track the calculation (no PII)
    trackEvent({
      name: 'roi_calculator_calculation',
      props: {
        card_type: cardKey,
        net_value: result.netValue,
        step: 'instant_calculation'
      }
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !calculationResult) return;

    setIsSubmittingEmail(true);
    try {
      // Save to database
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email,
            platform: 'roi_calculator',
            card_type: selectedCard
          }
        ]);

      if (error) throw error;

      // Track email conversion
      trackEvent({
        name: 'roi_calculator_email_signup',
        props: {
          card_type: selectedCard,
          email_domain: email.split('@')[1],
          net_value: calculationResult.netValue
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
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <Text variant="h3" className="mb-2">🧮 Credit Card ROI Calculator</Text>
          <Text variant="body" className="text-gray-600">
            See your potential savings instantly - no signup required
          </Text>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Select your credit card:</Label>
          {Object.entries(cardData).map(([key, card]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCard(key);
                calculateROI(key);
              }}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text variant="body" className="font-medium group-hover:text-green-600">
                    {card.name}
                  </Text>
                  <Text variant="caption" className="text-gray-500">
                    ${card.annualFee} annual fee
                  </Text>
                </div>
                <div className="text-right">
                  <Text variant="caption" className="text-green-600 font-medium">
                    Up to ${card.potentialBenefits}
                  </Text>
                  <Text variant="tiny" className="text-gray-400">
                    in benefits
                  </Text>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <Text variant="tiny" className="text-center text-gray-500 mt-4">
          🔒 Click any card for instant results
        </Text>
      </motion.div>
    );
  }

  if (step === 'results' && calculationResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <Text variant="h3" className="mb-2">📊 Your ROI Analysis</Text>
          <Text variant="body" className="text-gray-600">
            Here's what we found for your {calculationResult.cardName}
          </Text>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <Text variant="body" className="text-gray-600 mb-1">Annual Fee</Text>
            <Text variant="h4" className="text-red-600">-${calculationResult.annualFee}</Text>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <Text variant="body" className="text-gray-600 mb-1">Available Benefits</Text>
            <Text variant="h4" className="text-green-600">+${calculationResult.potentialBenefits}</Text>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <Text variant="body" className="text-gray-600 mb-1">Your Net Value</Text>
            <Text variant="h3" className="text-blue-600">+${calculationResult.netValue}</Text>
            <Text variant="tiny" className="text-gray-500">if you claim all benefits</Text>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <Text variant="body" className="text-gray-600 mb-1">You're Likely Missing</Text>
            <Text variant="h4" className="text-orange-600">${calculationResult.missedValue}</Text>
            <Text variant="tiny" className="text-gray-500 mt-1">
              Most people miss 70% of available benefits
            </Text>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => window.open('https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790', '_blank')}
            className="w-full"
          >
            Get Credify Now - Claim Your ${calculationResult.missedValue}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setStep('email')}
            className="w-full"
          >
            📧 Email Me Detailed Analysis (Free)
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
            <Text variant="h4" className="text-green-600 mb-2">📧 Analysis Sent!</Text>
            <Text variant="body" className="text-gray-600 mb-4">
              Check your email for a detailed breakdown of your {calculationResult?.cardName} benefits, plus tips to maximize your ROI.
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
              <Text variant="h3" className="mb-2">📧 Get Your Detailed Analysis</Text>
              <Text variant="body" className="text-gray-600">
                We'll send you a comprehensive breakdown with actionable tips
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
                  {isSubmittingEmail ? 'Sending...' : 'Send My Analysis 📊'}
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
                🔒 No spam, unsubscribe anytime. Just helpful tips to maximize your card benefits.
              </Text>
            </form>
          </>
        )}
      </motion.div>
    );
  }

  return null;
}