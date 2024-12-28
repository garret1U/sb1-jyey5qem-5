import { useState, useEffect } from 'react';
import type { GameType, GaugeType } from '../types';

interface PersonalStats {
  overall_average: number;
  longest_streak: number;
  total_rounds: number;
  perfect_rounds: number;
  average_trend: number;
  game_averages: Record<GameType, number>;
  score_history: Array<{
    date: string;
    score: number;
  }>;
}

interface TopShooter {
  id: string;
  name: string;
  average: number;
  high_score: number;
  rounds: number;
}

interface ClubStats {
  club_average: number;
  active_members: number;
  perfect_rounds_today: number;
  top_shooters: TopShooter[];
}

interface StatsParams {
  period: string;
  gauge?: GaugeType;
}

// Mock data for development
const mockPersonalStats: PersonalStats = {
  overall_average: 21.5,
  longest_streak: 47,
  total_rounds: 32,
  perfect_rounds: 3,
  average_trend: 2.3,
  game_averages: {
    'Skeet': 22.1,
    'Trap': 21.3,
    '5-Stand': 20.8,
    'Doubles Skeet': 19.5
  },
  score_history: Array.from({ length: 10 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 6) + 20 // Random scores between 20-25
  })).reverse()
};

const mockClubStats: ClubStats = {
  club_average: 22.3,
  active_members: 45,
  perfect_rounds_today: 2,
  top_shooters: [
    { id: '1', name: 'John Smith', average: 24.2, high_score: 25, rounds: 50 },
    { id: '2', name: 'Sarah Johnson', average: 23.8, high_score: 25, rounds: 42 },
    { id: '3', name: 'Mike Wilson', average: 23.5, high_score: 24, rounds: 38 }
  ]
};

export function useStats() {
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
  const [clubStats, setClubStats] = useState<ClubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async (period: string, gauge: GaugeType | 'all' = 'all') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API calls that use period and gauge parameters
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPersonalStats(mockPersonalStats);
      setClubStats(mockClubStats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    personalStats,
    clubStats,
    isLoading,
    error,
    fetchStats
  };
}