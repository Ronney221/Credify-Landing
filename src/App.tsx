import { RootLayout } from "./components/layout/RootLayout";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { AIAssistant } from "./components/sections/AIAssistant";
import { CardShowcase } from "./components/sections/CardShowcase";

export default function App() {
  return (
    <RootLayout>
      <Hero />
      <Features />
      <AIAssistant />
      <CardShowcase />
    </RootLayout>
  );
}
