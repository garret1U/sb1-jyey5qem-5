import { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Target, Trophy } from 'lucide-react';
import { useStats } from '../../hooks/useStats';
import { GameType, GaugeType } from '../../types';
import { StatsCard } from './StatsCard';
import { TrendChart } from './TrendChart';
import { StatisticsFilters } from './StatisticsFilters';

export function PersonalStats() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');
  const [selectedGauge, setSelectedGauge] = useState<GaugeType | 'all'>('all');
  const { personalStats, fetchStats } = useStats();
  
  const gameTypes: GameType[] = ['Skeet', 'Trap', '5-Stand', 'Doubles Skeet'];

  useEffect(() => {
    fetchStats(selectedPeriod, selectedGauge);
  }, [selectedPeriod, selectedGauge, fetchStats]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Personal Statistics</h2>
      
      <StatisticsFilters
        selectedPeriod={selectedPeriod}
        selectedGauge={selectedGauge}
        onPeriodChange={setSelectedPeriod}
        onGaugeChange={setSelectedGauge}
      />
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Overall Average"
          value={personalStats?.overall_average?.toFixed(1) || '0.0'}
          icon={Target}
          trend={personalStats?.average_trend}
        />
        <StatsCard
          title="Longest Streak"
          value={personalStats?.longest_streak?.toString() || '0'}
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Rounds"
          value={personalStats?.total_rounds?.toString() || '0'}
          icon={BarChart2}
        />
        <StatsCard
          title="Perfect Rounds"
          value={personalStats?.perfect_rounds?.toString() || '0'}
          icon={Trophy}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Score Trends</h3>
        <div className="h-64">
          <TrendChart data={personalStats?.score_history || []} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Game Type Averages</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {gameTypes.map((game) => (
            <div
              key={game}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-900">{game}</span>
              <span className="text-2xl font-bold text-indigo-600">
                {personalStats?.game_averages?.[game]?.toFixed(1) || '0.0'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}