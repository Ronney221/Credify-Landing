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
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    marketingConsent: false,
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
            platform: 'android'
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      // Reset form
      setFormData({
        email: '',
        firstName: '',
        marketingConsent: false,
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
          <Text variant="h3" className="mb-4">Join Android Waitlist</Text>
          
          {success ? (
            <div className="text-center py-8">
              <Text variant="h4" className="text-green-600 mb-2">🎉 You're on the list!</Text>
              <Text variant="body" className="text-gray-600">
                We'll notify you when Credify launches on Android.
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

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive updates about Credify's Android launch and other promotional communications. You can unsubscribe at any time.
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