import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/timeFormatter';

interface TimerProps {
  timeRemaining: number;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, className = '' }) => {
  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-red-500'; // 5 minutes
    if (timeRemaining <= 900) return 'text-orange-500'; // 15 minutes
    return 'text-gray-800';
  };

  return (
    <div className={`text-center p-4 bg-white rounded-lg shadow ${className}`}>
      <Clock className="w-6 h-6 mx-auto mb-2" />
      <div className={`text-2xl font-mono ${getTimeColor()}`}>
        {formatTime(timeRemaining)}
      </div>
      {timeRemaining <= 300 && (
        <p className="text-red-500 text-sm mt-2">
          Sắp hết giờ!
        </p>
      )}
    </div>
  );
};

export default Timer;