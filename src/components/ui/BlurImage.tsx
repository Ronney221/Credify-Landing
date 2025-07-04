import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function BlurImage({ className, src, alt, fallback, ...props }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "transition-all duration-300",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
        )}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (fallback) {
            target.src = fallback;
          }
        }}
        {...props}
      />
    </div>
  );
} 