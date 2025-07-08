import { CardBenefits } from "./components/sections/CardBenefits";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { PartnerLogos } from "./components/sections/PartnerLogos";
import { Scrollytelling } from "./components/sections/Scrollytelling";
import { TheProblem } from "./components/sections/TheProblem";
import { RootLayout } from "./components/layout/RootLayout";
import { Testimonials } from "./components/sections/Testimonials";

function App() {
  return (
    <RootLayout>
      <Hero />
      <PartnerLogos />
      <TheProblem />
      <CardBenefits />
      <Testimonials />
      <HowItWorks />
      <Scrollytelling />
      <FAQ />
    </RootLayout>
  );
}

export default App;
