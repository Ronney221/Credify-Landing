import { RootLayout } from "./components/RootLayout";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { ScreenshotShowcase } from "./components/sections/ScreenshotShowcase";
import { CardShowcase } from "./components/sections/CardShowcase";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <RootLayout>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-24 bg-white">
          <Hero />
        </section>

        {/* Card Showcase */}
        <section className="py-24 bg-gray-50">
          <CardShowcase />
        </section>

        {/* Screenshot Showcase */}
        <section className="py-24 bg-white">
          <ScreenshotShowcase />
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <Features />
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <FAQ />
        </section>
      </main>
      <Footer />
    </RootLayout>
  );
}
