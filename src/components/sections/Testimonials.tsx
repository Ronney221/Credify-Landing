import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { Star } from "lucide-react";
import { BlurImage } from "@/components/ui/BlurImage";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Travel Enthusiast",
    text: "Credify has completely changed how I manage my credit card benefits. I used to miss out on so many perks, but now I'm maximizing every dollar of value.",
    avatar: "/avatars/sarah.jpg",
    rating: 5
  },
  {
    name: "Michael R.",
    role: "Business Owner",
    text: "The AI assistant is incredibly helpful. It's like having a personal credit card expert in my pocket. Saved me hundreds in benefits I didn't know I had.",
    avatar: "/avatars/michael.jpg",
    rating: 5
  },
  {
    name: "Jessica L.",
    role: "Foodie",
    text: "Love how it reminds me about my dining credits! No more forgetting to use my Amex Gold benefits at restaurants. The app pays for itself.",
    avatar: "/avatars/jessica.jpg",
    rating: 5
  },
  {
    name: "David K.",
    role: "Digital Nomad",
    text: "Finally, an app that understands complex travel rewards! The benefit tracking is spot-on, and the interface is beautiful and intuitive.",
    avatar: "/avatars/david.jpg",
    rating: 5
  },
  {
    name: "Emily W.",
    role: "Tech Professional",
    text: "The smart notifications are a game-changer. I never miss a credit or benefit deadline anymore. Plus, the AI suggestions are surprisingly accurate!",
    avatar: "/avatars/emily.jpg",
    rating: 5
  },
  {
    name: "Alex P.",
    role: "Finance Analyst",
    text: "As someone who juggles multiple premium cards, this app is a lifesaver. The ROI tracking feature helps me decide which cards are worth keeping.",
    avatar: "/avatars/alex.jpg",
    rating: 5
  },
  {
    name: "Rachel T.",
    role: "Luxury Traveler",
    text: "The lounge access tracking and airport recommendations have enhanced my travel experience significantly. Worth every penny!",
    avatar: "/avatars/rachel.jpg",
    rating: 5
  },
  {
    name: "James H.",
    role: "Restaurant Owner",
    text: "Being able to track both personal and business card benefits in one place is fantastic. The expense categorization is spot on.",
    avatar: "/avatars/james.jpg",
    rating: 5
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, text, avatar, rating }: typeof testimonials[0]) {
  return (
    <motion.div
      className="flex-none w-[300px] md:w-[400px] p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-none w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
          <BlurImage 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
            fallback={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23ffffff80' font-size='20'>${name[0]}</text></svg>`}
          />
        </div>
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-sm text-white/60">{role}</div>
        </div>
      </div>
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>
      <p className="text-white/80 text-sm leading-relaxed line-clamp-3 min-h-[4.5em]">{text}</p>
    </motion.div>
  );
}

function ParallaxText({ children, baseVelocity = 5 }: { children: React.ReactNode; baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(v, -100, 0)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap whitespace-nowrap">
      <motion.div className="flex gap-6" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function wrap(value: number, min: number, max: number) {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Loved by Users
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join thousands of users who are already maximizing their credit card benefits with Credify.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

        {/* Auto-scrolling testimonials */}
        <div className="py-8">
          <ParallaxText baseVelocity={-1}>
            {testimonials.slice(0, 4).map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </ParallaxText>
        </div>
        <div className="py-8">
          <ParallaxText baseVelocity={1}>
            {testimonials.slice(4).map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </ParallaxText>
        </div>
      </div>
    </section>
  );
} 