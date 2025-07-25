import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
  priority?: boolean; // For above-the-fold images
}

export function useLazyImage(
  src: string, 
  options: UseLazyImageOptions = {}
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const {
    rootMargin = '50px',
    threshold = 0.1,
    priority = false
  } = options;

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    // If priority is true, load immediately (for above-the-fold images)
    if (priority) {
      setIsInView(true);
      return;
    }

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(imgElement);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(imgElement);

    return () => {
      observer.unobserve(imgElement);
    };
  }, [rootMargin, threshold, priority]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setError(null);
    };

    img.onerror = () => {
      setError('Failed to load image');
      setIsLoaded(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isInView]);

  return {
    ref: imgRef,
    isLoaded,
    isInView,
    error,
    shouldLoad: isInView
  };
}