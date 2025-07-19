import { CardBenefits } from "./components/sections/CardBenefits";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { PartnerLogos } from "./components/sections/PartnerLogos";
import { Scrollytelling } from "./components/sections/Scrollytelling";
import { PrivacyFirst } from "./components/sections/PrivacyFirst";
import { RootLayout } from "./components/layout/RootLayout";
import { Testimonials } from "./components/sections/Testimonials";
import { LaunchCountdown } from "./components/ui/LaunchCountdown";
import { ValueByPortfolio } from "./components/sections/ValueByPortfolio";

function App() {
  return (
    <RootLayout>
      {/* 1. Hero - Lead with the core problem */}
      <Hero />
      
      {/* Launch Countdown */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <LaunchCountdown />
        </div>
      </section>
      
      {/* 5. Partner Logos for Credibility */}
      <PartnerLogos />
      
      {/* Value by Portfolio Size */}
      <ValueByPortfolio />
      
      {/* 2. The Pain & The Numbers - Hit them with powerful statistics */}
      <PrivacyFirst />
      
      {/* 3. The Concrete Solution - Show the tangible value */}
      <CardBenefits />
      
      {/* 4. Build Trust with Social Proof */}
      <Testimonials />
      
      
      {/* 6. How It Works - Show the simple process */}
      <HowItWorks />
      
      {/* 7. Interactive Features Demo */}
      <Scrollytelling />
      
      {/* 8. FAQ - Address remaining questions */}
      <FAQ />
    </RootLayout>
  );
}

export default App;
