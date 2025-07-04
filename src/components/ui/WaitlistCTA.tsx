import { useState } from 'react';
import { motion } from 'framer-motion';

interface WaitlistCTAProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function WaitlistCTA({ variant = 'primary', className = '' }: WaitlistCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // TODO: Implement actual waitlist signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  const containerStyles = variant === 'primary'
    ? 'bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10'
    : '';

  return (
    <div className={`${containerStyles} ${className}`}>
      {variant === 'primary' && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
          <p className="text-gray-500">Join our waitlist to be among the first to maximize your card benefits.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900"
          disabled={status === 'loading' || status === 'success'}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-8 py-3 rounded-lg bg-brand text-gray-900 font-medium hover:bg-brand/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Joining...' :
           status === 'success' ? 'Welcome aboard! 🎉' :
           'Request Early Access'}
        </motion.button>
      </form>

      <div className="mt-4 flex items-center justify-center sm:justify-start gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>No spam, ever</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Unsubscribe anytime</span>
        </div>
      </div>
    </div>
  );
} 