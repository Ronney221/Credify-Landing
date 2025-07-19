import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { BlurImage } from "@/components/ui/BlurImage";
import { useState, useCallback, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah P.",
    text: "I'm embarrassed to admit how many times I've let my $50 Saks credit expire. Credify sent me a reminder a few weeks before the June deadline, and I finally used it to get a gift I'd been eyeing. <highlight>It's like the app found free money for me.</highlight>",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Michael R.",
    text: "Juggling the Amex Platinum, Chase Sapphire, and a Hilton card was a nightmare. <highlight>The unified dashboard is a game-changer. Seeing my Uber Cash, dining credits, and airline fee allowances all in one place has made me feel completely in control</highlight> of my benefits for the first time.",
    avatar: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Dr. Anya Sharma",
    text: "As someone who analyzes everything, I love the ROI tracker. <highlight>It's one thing to have perks, but another to see a real-time dashboard showing I've already gotten $650 in value back from my $695 annual fee.</highlight> It validates my decision to keep the card every time I open the app.",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "David L.",
    text: "I had no idea my card offered a $20 monthly credit for digital entertainment. <highlight>Credify flagged it the moment I added my card, and now I'm saving $240 a year. Literally paid for itself on day one.</highlight>",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Jessica Chen",
    text: "<highlight>The AI assistant is brilliant. It not only recommended my Platinum for the 5x points but also reminded me I had a $200 airline fee credit I could use for checked bags.</highlight> So smart.",
    avatar: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Chris G.",
    text: "I've avoided financial apps that require you to link your bank accounts. <highlight>I was so relieved to find that Credify is completely manual. I get all the benefit tracking with none of the security worries.</highlight> It's the perfect setup.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Ben Carter",
    text: "<highlight>I travel a lot for work, and Credify reminded me to renew my CLEAR Plus membership with the right card, ensuring I got the full $189 statement credit.</highlight> It's like having a personal assistant for my wallet.",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Chloe Kim",
    text: "<highlight>The interface is so clean and intuitive. I love the draggable card lists and how easy it is to mark a perk as 'redeemed'.</highlight> The app feels incredibly polished and smooth to use, which makes me actually want to open it.",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Samuel Jones",
    text: "My wife and I both have cards with DoorDash credits, and we could never keep track. <highlight>The app clearly lays out our monthly restaurant and grocery credits. We've stopped letting them go to waste and now plan our take-out nights around them.</highlight>",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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

function TestimonialCard({ name, text, avatar, rating }: typeof testimonials[0]) {
  // Split text by highlight tags and render with proper styling
  const parts = text.split(/(<highlight>|<\/highlight>)/);
  
  return (
    <motion.div
      className="flex flex-col h-full p-8 rounded-xl bg-[#111827] backdrop-blur-sm border border-white/[0.05] hover:bg-[#1a1f2d] transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-none w-12 h-12 rounded-full overflow-hidden bg-white/[0.03]">
          <BlurImage 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="font-semibold text-white/90">{name}</div>
      </div>
      <div className="mb-6">
        <StarRating rating={rating} />
      </div>
      <p className="text-white/70 text-base leading-relaxed flex-grow">
        {parts.map((part, index) => {
          if (part === "<highlight>") return null;
          if (part === "</highlight>") return null;
          if (parts[index - 1] === "<highlight>") {
            return <span key={index} className="text-white font-medium">{part}</span>;
          }
          return part;
        })}
      </p>
    </motion.div>
  );
}

function CarouselDots({ total, current, onClick }: { total: number, current: number, onClick: (index: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === current ? "bg-white/90 w-4" : "bg-white/20 hover:bg-white/40"
          }`}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
}

function CarouselButton({ direction, onClick }: { direction: "left" | "right", onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
      style={{ [direction]: "-24px" }}
      aria-label={`Show ${direction === "left" ? "previous" : "next"} testimonials`}
    >
      {direction === "left" ? (
        <ChevronLeft className="w-6 h-6 text-white/60 group-hover:text-white/90" />
      ) : (
        <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white/90" />
      )}
    </button>
  );
}

export function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginate = useCallback((newDirection: number) => {
    setPage(prev => [(prev[0] + newDirection + totalPages) % totalPages, newDirection]);
  }, [totalPages]);

  const nextPage = useCallback(() => paginate(1), [paginate]);
  const prevPage = useCallback(() => paginate(-1), [paginate]);

  const goToPage = useCallback((newPage: number) => {
    setPage(prev => {
        if (newPage === prev[0]) return prev;
        const newDirection = newPage > prev[0] ? 1 : -1;
        return [newPage, newDirection];
    });
  }, []);

  const currentTestimonials = testimonials.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="py-32 bg-gradient-to-b from-black to-slate-950">
      <div className="container px-6 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join beta users who are finally maximizing every credit and benefit from their cards
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag={itemsPerPage === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_e, { offset, velocity }) => {
                if (itemsPerPage !== 1) return;
                const swipeThreshold = 50;
                
                if (Math.abs(offset.x) < swipeThreshold) return;

                if (velocity.x < -200) {
                  nextPage();
                } else if (velocity.x > 200) {
                  prevPage();
                }
              }}
            >
              {currentTestimonials.map((testimonial) => (
                <TestimonialCard key={`${testimonial.name}-${page}`} {...testimonial} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          <CarouselButton direction="left" onClick={prevPage} />
          <CarouselButton direction="right" onClick={nextPage} />
          
          <CarouselDots
            total={totalPages}
            current={page}
            onClick={goToPage}
          />
        </div>
      </div>
    </section>
  );
} 