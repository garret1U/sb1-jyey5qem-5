import type { BirdResult } from '../../types';

interface ScoreDotsProps {
  birds: BirdResult[];
  className?: string;
}

export function ScoreDots({ birds, className = '' }: ScoreDotsProps) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {birds.map((bird, idx) => (
        <div
          key={idx}
          className={`w-1.5 h-1.5 rounded-full ${
            bird === 'hit' ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      ))}
    </div>
  );
}