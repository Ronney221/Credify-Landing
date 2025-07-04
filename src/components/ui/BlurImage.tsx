import { useState } from "react";
import { motion } from "framer-motion";

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function BlurImage({ src, alt, width, height, className = "", priority = false }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <motion.div
      initial={{ filter: "blur(20px)" }}
      animate={{ filter: isLoading ? "blur(20px)" : "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
        loading={priority ? "eager" : "lazy"}
        className={`duration-700 ease-in-out ${className}`}
      />
    </motion.div>
  );
} 