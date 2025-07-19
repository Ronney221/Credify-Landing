import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Text } from './Text';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdown() {
  // Set target date to end of July 2025
  const targetDate = new Date('2025-07-31T23:59:59').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-4">
        <Text variant="body" className="font-semibold text-gray-800">
          🚀 Public Launch Countdown
        </Text>
        <Text variant="caption" className="text-gray-600">
          Get ready for the full release!
        </Text>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Min' },
          { value: timeLeft.seconds, label: 'Sec' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-white rounded-lg p-2 shadow-sm border border-gray-100"
            animate={{ scale: item.value % 10 === 0 && item.label === 'Sec' ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Text variant="h4" className="font-bold text-gray-900">
              {item.value.toString().padStart(2, '0')}
            </Text>
            <Text variant="tiny" className="text-gray-500">
              {item.label}
            </Text>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Text variant="tiny" className="text-gray-500">
          Limited beta spots available until then
        </Text>
      </div>
    </motion.div>
  );
}