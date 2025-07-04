import { RootLayout } from "./components/layout/RootLayout";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { AIAssistant } from "./components/sections/AIAssistant";
import { CardShowcase } from "./components/sections/CardShowcase";
import { Testimonials } from "./components/sections/Testimonials";
import { SocialProof } from "./components/sections/SocialProof";
import { FAQ } from "./components/sections/FAQ";

export default function App() {
  return (
    <RootLayout>
      <div id="hero">
        <Hero />
      </div>
      <SocialProof />
      <div id="features">
        <Features />
      </div>
      <div id="ai-assistant">
        <AIAssistant />
      </div>
      <div id="cards">
        <CardShowcase />
      </div>
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
    </RootLayout>
  );
}
