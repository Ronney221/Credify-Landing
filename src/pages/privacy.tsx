import { motion } from "framer-motion";
import { Text } from "../components/ui/Text";
import { RootLayout } from "../components/layout/RootLayout";
import { fadeIn } from "../lib/animations";

export default function PrivacyPage() {
  return (
    <RootLayout>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <Text variant="h1" as="h1" className="mb-8 text-center">
              Terms & Privacy Policy
            </Text>
            <Text variant="subtitle" className="text-center mb-16">
              Last updated: May 30, 2025
            </Text>

            {/* Terms of Service Section */}
            <div className="prose prose-lg max-w-none mb-16">
              <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>
              
              <p className="mb-6">
                Welcome to Credify ("the App," "we," "our," or "us"). By installing,
                accessing, or using Credify, you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree to these Terms, you may not use
                the App.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">1. Eligibility and Account Registration</h3>
              <p className="mb-4">
                <strong>1.1 Age Requirement.</strong> You must be at least 18 years old to use Credify. By registering, you represent and warrant that you are at least 18.
              </p>
              <p className="mb-4">
                <strong>1.2 Account Creation.</strong> To use Credify, you must create an account ("Account") by providing a valid email address and password. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your Account.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">2. App Features and User Obligations</h3>
              <p className="mb-4">
                <strong>2.1 Perk Tracking.</strong> Credify allows you to manually import credit-card information (card names, annual fees, perk categories, etc.). You are solely responsible for the accuracy, currency, and completeness of all data you enter.
              </p>
              <p className="mb-4">
                <strong>2.2 Perk Information.</strong> We aggregate publicly available data and user-provided details about common credit-card perks. This information may become outdated or inaccurate.
              </p>
              <p className="mb-4">
                <strong>2.3 Notifications and Reminders.</strong> Credify can send you notifications for approaching perk expiration or renewal periods.
              </p>
              <p className="mb-4">
                <strong>2.4 One-Tap Redemption.</strong> When you tap a perk, Credify attempts to open the associated third-party app or website.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property</h3>
              <p className="mb-4">
                Credify and all its intellectual property—source code, designs, logos, graphics, trademarks, and content—are owned by us or our licensors. All rights are reserved.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">4. Payment and Subscription</h3>
              <p className="mb-4">
                Credify may offer both a free tier with basic features and a Premium subscription with advanced capabilities. Pricing, trial periods, and feature differences will be displayed within the App.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">5. Disclaimer of Warranties</h3>
              <p className="mb-4">
                THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h3>
              <p className="mb-4">
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL CREDIFY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">7. Changes to These Terms</h3>
              <p className="mb-4">
                We may update these Terms from time to time. When we do, we will revise the "Last updated" date above and post the new Terms within the App.
              </p>
            </div>

            {/* Privacy Policy Section */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>

              <p className="mb-6">
                Credify values your privacy. This Privacy Policy explains what information we collect, how we use it, and what choices you have regarding your information.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h3>
              <h4 className="font-semibold mt-4 mb-2">1.1 User-Provided Information</h4>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Account Registration Data:</strong> When you sign up, you provide a valid email address and create a password.</li>
                <li><strong>Credit-Card Metadata:</strong> You manually input card nicknames, issuer names, annual-fee amounts, and perk categories.</li>
                <li><strong>Perk Usage and Settings:</strong> Which perks you track, your custom expiration periods, reminder preferences, and notes you add.</li>
                <li><strong>Device Information:</strong> Device type, operating system version, and unique device identifiers.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Provide Core Features:</strong> Display your card perks, set reminders, open associated apps, and show redemption progress.</li>
                <li><strong>Improve the App:</strong> Analyze usage patterns, diagnose technical issues, and prioritize new features.</li>
                <li><strong>Communicate with You:</strong> Send push notifications, email updates, or customer support responses.</li>
                <li><strong>Personalize Your Experience:</strong> Remember your settings and suggest optimizations.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h3>
              <p className="mb-4">
                We take reasonable technical and organizational measures to protect your data from unauthorized access, alteration, or destruction. These measures include industry-standard encryption and secure data-storage practices.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">4. Your Privacy Rights</h3>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Access and Update:</strong> Review or update your Account information through the App's Settings.</li>
                <li><strong>Push Notifications:</strong> Opt out through your device's notification settings.</li>
                <li><strong>Analytics Opt-Out:</strong> Disable analytics permissions in your device's privacy settings.</li>
                <li><strong>Data Export/Deletion:</strong> Contact us to request a copy or deletion of your data.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Contact Us</h3>
              <p className="mb-4">
                If you have any questions about our Terms or Privacy Policy, please contact us:
              </p>
              <ul className="list-none mb-4">
                <li>Email: privacy@credifyapp.com</li>
                <li>Address: Credify, Inc. • 1234 Market St, San Francisco, CA 94103</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </RootLayout>
  );
} 