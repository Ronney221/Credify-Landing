import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Text } from "../ui/Text";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";

const faqItems = [
  {
    question: "What is Credify and how does it work?",
    answer: "Credify is your AI-powered command center for credit card perks. It helps you track, manage, and maximize your credit card benefits in one place. The app shows a unified dashboard of all your available benefits—monthly, quarterly, and annual—and helps ensure you get every dollar of value from your annual fees.",
  },
  {
    question: "Do you need my bank login or credit card numbers?",
    answer: "No, absolutely not! We never ask for or store your bank login credentials or credit card numbers. Credify is designed to work without requiring any sensitive financial information. Simply select your cards from our comprehensive list, and we'll help you track all the benefits. Your security is our top priority.",
  },
  {
    question: "How do you keep my information secure?",
    answer: "Security is our highest priority. We use:\n\n• Bank-level 256-bit encryption\n• Secure SSL connections\n• Regular security audits\n• No storage of sensitive financial data\n• Read-only access to benefit information\n• Compliance with industry security standards\n\nWe treat your data with the utmost care and never share or sell your personal information.",
  },
  {
    question: "How does Credify make money?",
    answer: "We believe in complete transparency about our business model. Credify operates on a freemium model:\n\n• Free Tier: Basic features for tracking essential benefits\n• Premium Tier: Advanced analytics, unlimited cards, and priority support\n\nWe never sell your personal data or make money from your financial information. Our revenue comes solely from premium subscriptions and optional features.",
  },
  {
    question: "Which credit cards do you support?",
    answer: "We support all major premium travel and rewards cards from issuers like American Express, Chase, Capital One, Citi, and more. This includes popular cards like the Amex Platinum, Chase Sapphire Reserve, Capital One Venture X, and many others. We are continuously expanding our card database.",
  },
  {
    question: "How do I track and redeem perks?",
    answer: "Credify makes perk tracking and redemption easy:\n\n1. Dashboard View: See all your cards and available perks\n2. One-Tap Redemption: Open associated merchant apps directly\n3. Auto-Redemption: Set up automatic tracking for recurring perks\n4. Progress Tracking: Watch your savings add up in real-time\n5. Smart Notifications: Get reminders before perks expire",
  },
  {
    question: "How does the AI Assistant work?",
    answer: "Our AI Assistant is your personal financial advisor powered by advanced machine learning. You can:\n\n- Ask questions about your card benefits\n- Get personalized advice on which card to use\n- Receive summaries of your spending habits\n- Get help understanding complex perks\n\nThe AI uses natural language processing to provide accurate, contextual responses to your questions.",
  },
  {
    question: "What insights and analytics are available?",
    answer: "The Insights dashboard provides detailed analytics including:\n\n- 6-month history of perk redemptions\n- ROI leaderboard showing your best-performing cards\n- Category-based spending analysis\n- Progress toward breaking even on annual fees\n- Monthly and yearly savings summaries",
  },
  {
    question: "How do notifications work?",
    answer: "You can customize various notification types:\n\n- Perk expiry reminders (7, 3, and 1 day before)\n- Card renewal alerts\n- Monthly perk reset reminders\n- Weekly digest of available perks\n- Quarterly and annual perk summaries",
  },
  {
    question: "How do you calculate ROI?",
    answer: "We track your return on investment by monitoring all redeemed perks, calculating the actual value received, and comparing it against your annual fees. The app shows real-time progress toward breaking even on each card's annual fee and provides detailed analytics in the Insights tab.",
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-[720px]">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Text variant="h2" as="h2" className="mb-6">
            Frequently Asked Questions
          </Text>
          <Text variant="subtitle">
            Have questions about Credify? We've got you covered.
          </Text>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <Text className="text-left font-medium">{item.question}</Text>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <Text className="text-gray-600 whitespace-pre-line">{item.answer}</Text>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 