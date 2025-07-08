import { CardBenefits } from "./components/sections/CardBenefits";
import { FAQ } from "./components/sections/FAQ";
import { Features } from "./components/sections/Features";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Scrollytelling } from "./components/sections/Scrollytelling";
import { TheProblem } from "./components/sections/TheProblem";
import { RootLayout } from "./components/layout/RootLayout";

function App() {
  return (
    <RootLayout>
      <Hero />
      <TheProblem />
      <Scrollytelling />
      <HowItWorks />
      <CardBenefits />
      <FAQ />
      <Features />
      <Footer />
    </RootLayout>
  );
}

export default App;
