import { CardBenefits } from "./components/sections/CardBenefits";
import { Features } from "./components/sections/Features";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { PartnerLogoWall } from "./components/sections/PartnerLogoWall";
import { Scrollytelling } from "./components/sections/Scrollytelling";
import { TheProblem } from "./components/sections/TheProblem";
import { RootLayout } from "./components/layout/RootLayout";

function App() {
  return (
    <RootLayout>
      <Hero />
      <PartnerLogoWall />
      <TheProblem />
      <Scrollytelling />
      <HowItWorks />
      <CardBenefits />
      <Features />
    </RootLayout>
  );
}

export default App;
