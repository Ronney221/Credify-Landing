import { BrowserRouter as Router } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { Hero } from "@/components/sections/Hero";

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Hero />
        
        <section id="features" className="py-16 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Core Benefits</h2>
            {/* Features grid will go here */}
          </div>
        </section>

        <section id="ai-assistant" className="py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Insights</h2>
            {/* AI assistant preview will go here */}
          </div>
        </section>

        <section id="cards" className="py-16 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Supported Cards</h2>
            {/* Card showcase will go here */}
          </div>
        </section>

        <section id="testimonials" className="py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            {/* Testimonials will go here */}
          </div>
        </section>

        <section id="faq" className="py-16 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            {/* FAQ accordion will go here */}
          </div>
        </section>
      </RootLayout>
    </Router>
  );
}
