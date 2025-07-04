import { useState } from "react";
import { motion } from "framer-motion";

interface BlurImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}

export function BlurImage({ src, alt, width, height, fill, className = "" }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <motion.img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={`
        duration-700 ease-in-out
        ${isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"}
        ${fill ? "absolute inset-0 w-full h-full" : ""}
        ${className}
      `}
      onLoad={() => setLoading(false)}
    />
  );
} 