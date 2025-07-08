import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from './dialog';
import { Text } from './Text';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function WaitlistDialog({ 
  isOpen, 
  onClose,
  defaultPlatform = 'android'
}: { 
  isOpen: boolean; 
  onClose: () => void;
  defaultPlatform?: 'android' | 'both';
}) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    marketingConsent: false,
    platform: defaultPlatform,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: formData.email,
            first_name: formData.firstName,
            marketing_consent: formData.marketingConsent,
            platform: formData.platform
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      // Reset form
      setFormData({
        email: '',
        firstName: '',
        marketingConsent: false,
        platform: defaultPlatform,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="p-6"
        >
          <Text variant="h3" className="mb-4">Join the Waitlist</Text>
          
          {success ? (
            <div className="text-center py-8">
              <Text variant="h4" className="text-green-600 mb-2">🎉 You're on the list!</Text>
              <Text variant="body" className="text-gray-600">
                {formData.platform === 'android' 
                  ? "We'll notify you when Credify launches on Android."
                  : "We'll keep you updated on all Credify launches and news."}
              </Text>
              <Button
                onClick={onClose}
                className="mt-6"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="platform">I'm interested in *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'android' }))}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.platform === 'android'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Android
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'both' }))}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.platform === 'both'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    All Updates
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive updates about Credify and other promotional communications. You can unsubscribe at any time.
                </Label>
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
} 