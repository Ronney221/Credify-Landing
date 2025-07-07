import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Text } from "../ui/Text";
import { BlurImage } from "../ui/BlurImage";

const scrollytellingData = [
  {
    title: "Maximize Your Value",
    description: "Credify's dashboard gives you a real-time view of your total rewards and return on investment, so you always know where you stand.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 1.png",
  },
  {
    title: "Claim Every Perk",
    description: "Get smart reminders for monthly, quarterly, and annual credits for things like dining, travel, and entertainment before they expire.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 3.png",
  },
  {
    title: "Smart, Actionable Advice",
    description: "Receive personalized recommendations on which card to use for your purchases to maximize your points and cash back.",
    image: "/assets/screenshots/Apple iPhone 16 Pro Max Screenshot 4.png",
  },
];

export function Scrollytelling() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left: Text Content */}
          <div className="w-full md:w-1/2">
            {scrollytellingData.map((step, i) => {
              const stepProgress = useTransform(
                scrollYProgress,
                [i / scrollytellingData.length, (i + 1) / scrollytellingData.length],
                [0, 1]
              );
              const opacity = useTransform(stepProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

              return (
                <motion.div
                  key={i}
                  style={{ opacity }}
                  className="h-screen flex flex-col justify-center"
                >
                  <Text variant="h2" as="h2" className="mb-6">{step.title}</Text>
                  <Text variant="subtitle">{step.description}</Text>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Sticky Phone Mockup */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[600px] md:w-[360px] md:h-[640px]">
              {scrollytellingData.map((step, i) => {
                const imageOpacity = useTransform(
                  scrollYProgress,
                  [i / scrollytellingData.length, (i + 0.5) / scrollytellingData.length, (i + 1) / scrollytellingData.length],
                  [0, 1, 0]
                );
                return(
                  <motion.div
                    key={step.image}
                    style={{ opacity: imageOpacity }}
                    className="absolute inset-0"
                  >
                    <BlurImage
                      src={step.image}
                      alt={step.title}
                      width={360}
                      height={640}
                      className="rounded-[32px] shadow-2xl w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 