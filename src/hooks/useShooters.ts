import { useState, useEffect } from 'react';
import type { Shooter } from '../types';

// Mock data for development
const mockShooters: Shooter[] = [
  {
    id: '1',
    name: 'John Smith',
    status: 'active',
    joined_date: '2024-01-15',
    statistics: {
      average: 23.5,
      straights: 3,
      longest_streak: 75
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    status: 'active',
    joined_date: '2024-02-01',
    statistics: {
      average: 24.1,
      straights: 5,
      longest_streak: 92
    }
  },
  {
    id: '3',
    name: 'Mike Wilson',
    status: 'inactive',
    joined_date: '2023-11-20',
    statistics: {
      average: 21.8,
      straights: 1,
      longest_streak: 43
    }
  }
];

export function useShooters() {
  const [shooters, setShooters] = useState<Shooter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchShooters = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShooters(mockShooters);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch shooters'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchShooters();
  }, []);

  return {
    shooters,
    isLoading,
    error,
    setShooters
  };
}