import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from './dialog';
import { DetailedROICalculator } from '../forms/DetailedROICalculator';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ExitIntentPopupProps {
  isEnabled?: boolean;
}

export function ExitIntentPopup({ isEnabled = true }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!isEnabled || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        trackEvent({
          name: 'exit_intent_triggered',
          props: {
            page_url: window.location.pathname,
            time_on_page: Math.floor(performance.now() / 1000)
          }
        });
      }
    };

    // Add delay to prevent immediate triggering
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000); // Wait 10 seconds before enabling

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEnabled, hasShown, trackEvent]);

  const handleClose = () => {
    setIsOpen(false);
    trackEvent({
      name: 'exit_intent_closed',
      props: {
        interaction_type: 'manual_close'
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative"
        >
          {/* Attention-grabbing header */}
          <div className="text-center mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <h2 className="text-2xl font-bold text-orange-800 mb-2">
              ⚠️ Wait! Before you go...
            </h2>
            <p className="text-orange-700">
              Don't leave money on the table! Get your <strong>free ROI analysis</strong> and discover how much you're missing from your credit card benefits.
            </p>
          </div>
          
          <DetailedROICalculator onClose={handleClose} />
          
          {/* Additional urgency messaging */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              <strong>Exclusive offer:</strong> Join 500+ smart cardholders who've already discovered their hidden benefits worth an average of <span className="font-bold text-green-600">$847/year</span>.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}