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

export function FAQ() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know about Credify and how it works.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 text-white hover:text-white/90 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-white/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 