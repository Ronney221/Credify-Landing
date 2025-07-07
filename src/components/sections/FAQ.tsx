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
    question: "Is my financial information secure?",
    answer: "Yes, absolutely. We use bank-level 256-bit encryption and secure connections to protect your data. We never store your card credentials on our servers.",
  },
  {
    question: "Do you sell my data?",
    answer: "No. We will never sell your personal data to third parties. Your privacy is our top priority. Our business model is based on providing a premium service, not monetizing your information.",
  },
  {
    question: "Which credit cards do you support?",
    answer: "We support all major premium travel and rewards cards from issuers like American Express, Chase, Capital One, Citi, and more. We are continuously expanding our support.",
  },
  {
    question: "How does Credify make money?",
    answer: "Credify is a subscription service. We plan to offer a free tier with basic features and a premium subscription that unlocks advanced analytics, unlimited cards, and priority support.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 md:py-32">
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
            Have questions? We've got answers.
          </Text>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 