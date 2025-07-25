import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from './dialog';
import { Text } from './Text';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { supabase } from '../../lib/supabase';
import { useAnalytics } from '@/hooks/useAnalytics';

export function SimpleWaitlistDialog({ 
  isOpen, 
  onClose,
  title = "Join the Android Waitlist",
  description = "Get notified when Credify launches on Android"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { trackWaitlistSignup } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email,
            platform: 'android'
          }
        ]);

      if (supabaseError) throw supabaseError;

      trackWaitlistSignup(email);
      setSuccess(true);
      setEmail('');
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
          <Text variant="h3" className="mb-2">{title}</Text>
          <Text variant="body" className="text-gray-600 mb-6">{description}</Text>
          
          {success ? (
            <div className="text-center py-8">
              <Text variant="h4" className="text-green-600 mb-2">🎉 You're on the list!</Text>
              <Text variant="body" className="text-gray-600 mb-4">
                We'll notify you as soon as Credify launches on Android.
              </Text>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full"
                />
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
                  className="min-w-[120px]"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>

              <Text variant="tiny" className="text-center text-gray-500">
                🔒 No spam, unsubscribe anytime
              </Text>
            </form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}