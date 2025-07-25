import { useState } from "react";
import { motion } from "framer-motion";
import { useLazyImage } from "@/hooks/useLazyImage";

interface BlurImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  rootMargin?: string;
}

export function BlurImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className = "",
  priority = false,
  rootMargin = "50px"
}: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);
  const { ref, shouldLoad, isLoaded, error } = useLazyImage(src, { 
    priority, 
    rootMargin 
  });

  // For priority images, show immediately
  const showImage = priority || shouldLoad;
  
  // Placeholder for when image hasn't loaded yet
  if (!showImage && !priority) {
    return (
      <div
        ref={ref}
        className={`
          bg-gray-200 animate-pulse
          ${fill ? "absolute inset-0 w-full h-full" : ""}
          ${className}
        `}
        style={!fill ? { width, height } : undefined}
        role="img"
        aria-label={`Loading ${alt}`}
      />
    );
  }

  // Show error state if image failed to load
  if (error && !priority) {
    return (
      <div
        className={`
          bg-gray-100 flex items-center justify-center text-gray-400 text-sm
          ${fill ? "absolute inset-0 w-full h-full" : ""}
          ${className}
        `}
        style={!fill ? { width, height } : undefined}
        role="img"
        aria-label={`Failed to load ${alt}`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={`
        duration-700 ease-in-out transition-all
        ${isLoading ? "scale-105 blur-lg grayscale" : "scale-100 blur-0 grayscale-0"}
        ${fill ? "absolute inset-0 w-full h-full object-cover" : ""}
        ${className}
      `}
      onLoad={() => setLoading(false)}
      onError={() => setLoading(false)}
    />
  );
} 