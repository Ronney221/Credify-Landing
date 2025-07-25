import { EnhancedCardBenefits } from "./components/sections/EnhancedCardBenefits";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/layout/Footer";
import { Hero2 } from "./components/sections/Hero2";
import { HowItWorks } from "./components/sections/HowItWorks";
import { PartnerLogos } from "./components/sections/PartnerLogos";
import { RedemptionHacks } from "./components/sections/RedemptionHacks";
import { Scrollytelling } from "./components/sections/Scrollytelling";
import { PrivacyFirst } from "./components/sections/PrivacyFirst";
import { RootLayout } from "./components/layout/RootLayout";
import { Testimonials } from "./components/sections/Testimonials";
import { ValueByPortfolio } from "./components/sections/ValueByPortfolio";
import { ErrorBoundary, SectionErrorBoundary } from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RootLayout>
        {/* 1. Hero - Lead with the core problem */}
        <SectionErrorBoundary sectionName="Hero">
          <Hero2 />
        </SectionErrorBoundary>
        
        {/* 5. Partner Logos for Credibility */}
        <SectionErrorBoundary sectionName="Partner Logos">
          <PartnerLogos />
        </SectionErrorBoundary>
        
        {/* 2. The Pain & The Numbers - Hit them with powerful statistics */}
        <SectionErrorBoundary sectionName="Privacy First">
          <PrivacyFirst />
        </SectionErrorBoundary>
        
        {/* Value by Portfolio Size */}
        <SectionErrorBoundary sectionName="Value by Portfolio">
          <ValueByPortfolio />
        </SectionErrorBoundary>
        
        {/* 3. The Concrete Solution - Show the tangible value */}
        <SectionErrorBoundary sectionName="Card Benefits">
          <EnhancedCardBenefits />
        </SectionErrorBoundary>
        
        {/* 4. Build Trust with Social Proof */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>
        
        {/* 6. How It Works - Show the simple process */}
        <SectionErrorBoundary sectionName="How It Works">
          <HowItWorks />
        </SectionErrorBoundary>
        
        {/* 7. Interactive Features Demo */}
        <SectionErrorBoundary sectionName="Interactive Demo">
          <Scrollytelling />
        </SectionErrorBoundary>
        
        {/* Redemption Tips & Hacks - New Feature Spotlight */}
        <SectionErrorBoundary sectionName="Redemption Hacks">
          <RedemptionHacks />
        </SectionErrorBoundary>

        {/* 8. FAQ - Address remaining questions */}
        <SectionErrorBoundary sectionName="FAQ">
          <FAQ />
        </SectionErrorBoundary>
      </RootLayout>
    </ErrorBoundary>
  );
}

export default App;