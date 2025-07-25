import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/Text";
import { supabase } from "@/lib/supabase";
import { useAnalytics } from "@/hooks/useAnalytics";

const cardData = {
  "amex-platinum": { name: "Amex Platinum", annualFee: 695, potentialBenefits: 1200 },
  "chase-sapphire-reserve": { name: "Chase Sapphire Reserve", annualFee: 550, potentialBenefits: 950 },
  "amex-gold": { name: "Amex Gold", annualFee: 250, potentialBenefits: 600 },
  "capital-one-venture-x": { name: "Capital One Venture X", annualFee: 395, potentialBenefits: 800 },
  "citi-prestige": { name: "Citi Prestige", annualFee: 495, potentialBenefits: 850 },
  "other": { name: "Other Premium Card", annualFee: 400, potentialBenefits: 700 }
};

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  cardType: z.string().min(1, "Please select your card"),
});

type FormData = z.infer<typeof formSchema>;

interface ROICalculatorProps {
  onClose?: () => void;
}

export function ROICalculator({ onClose }: ROICalculatorProps) {
  const [step, setStep] = useState<'calculator' | 'results'>('calculator');
  const [calculationResult, setCalculationResult] = useState<{
    cardName: string;
    annualFee: number;
    potentialBenefits: number;
    netValue: number;
    missedValue: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      cardType: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const selectedCard = cardData[data.cardType as keyof typeof cardData];
      const missedValue = Math.floor(selectedCard.potentialBenefits * 0.7); // Assume 70% of benefits are typically missed
      
      const result = {
        cardName: selectedCard.name,
        annualFee: selectedCard.annualFee,
        potentialBenefits: selectedCard.potentialBenefits,
        netValue: selectedCard.potentialBenefits - selectedCard.annualFee,
        missedValue: missedValue
      };

      // Save to database
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: data.email,
            first_name: data.firstName,
            platform: 'roi_calculator',
            card_type: data.cardType
          }
        ]);

      if (error) throw error;

      // Track analytics
      trackEvent({
        name: 'roi_calculator_completion',
        props: {
          card_type: data.cardType,
          email_domain: data.email.split('@')[1],
          potential_value: result.netValue
        }
      });

      setCalculationResult(result);
      setStep('results');
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Failed to calculate ROI. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === 'results' && calculationResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <Text variant="h3" className="mb-2">🎉 Your Credit Card ROI Analysis</Text>
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
            <Text variant="body" className="text-gray-600 mb-1">Net Value Potential</Text>
            <Text variant="h3" className="text-blue-600">+${calculationResult.netValue}</Text>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <Text variant="body" className="text-gray-600 mb-1">Typically Missed Benefits</Text>
            <Text variant="h4" className="text-orange-600">${calculationResult.missedValue}</Text>
            <Text variant="tiny" className="text-gray-500 mt-1">
              Most cardholders miss 70% of available benefits
            </Text>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Text variant="body" className="text-gray-600">
            📧 We've sent your detailed analysis to your email, plus tips on maximizing these benefits!
          </Text>
          
          <Button
            onClick={() => window.open('https://apps.apple.com/us/app/credify-ai-perk-tracker/id6746953790', '_blank')}
            className="w-full"
          >
            Get Credify Now - Start Claiming Your ${calculationResult.missedValue}
          </Button>
          
          {onClose && (
            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center mb-6">
        <Text variant="h3" className="mb-2">🧮 Free Credit Card ROI Calculator</Text>
        <Text variant="body" className="text-gray-600">
          Discover how much money you're leaving on the table
        </Text>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Premium Credit Card</FormLabel>
                <FormControl>
                  <select 
                    {...field} 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select your card...</option>
                    {Object.entries(cardData).map(([key, card]) => (
                      <option key={key} value={key}>
                        {card.name} (${card.annualFee} annual fee)
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Calculating..." : "Calculate My ROI 📊"}
            </Button>
          </div>

          <Text variant="tiny" className="text-center text-gray-500">
            🔒 We'll email you the results. No spam, unsubscribe anytime.
          </Text>
        </form>
      </Form>
    </motion.div>
  );
}