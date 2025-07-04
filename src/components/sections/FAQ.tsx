import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What credit cards does Credify support?",
    answer: "Credify supports all major premium credit cards from American Express, Chase, Capital One, Citi, and Bank of America. This includes popular cards like the Amex Platinum, Chase Sapphire Reserve, and Capital One Venture X."
  },
  {
    question: "How does the AI assistant help me maximize benefits?",
    answer: "Our AI assistant analyzes your spending patterns and card benefits to provide personalized recommendations. It can help you choose the best card for specific purchases, remind you of unused credits, and calculate the real-time value you're getting from each card."
  },
  {
    question: "Is my credit card information secure?",
    answer: "Absolutely. Credify uses bank-level encryption and never stores your full credit card numbers. We use secure APIs to track your benefits and our systems are regularly audited for security compliance."
  },
  {
    question: "How much does Credify cost?",
    answer: "Credify will launch with a free tier that includes basic benefit tracking. Premium features like AI assistance and advanced analytics will be available through a subscription, with pricing to be announced at launch."
  },
  {
    question: "Can I track multiple cards from different issuers?",
    answer: "Yes! Credify is designed to help you manage multiple cards across different issuers. You can track all your cards in one place, making it easy to maximize benefits and avoid missing any perks."
  },
  {
    question: "When will Credify be available?",
    answer: "We're currently in private beta and plan to launch publicly in early 2024. Join our waitlist to be among the first to try Credify and receive exclusive early-access benefits."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

export function FAQ() {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to know about Credify
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
} 