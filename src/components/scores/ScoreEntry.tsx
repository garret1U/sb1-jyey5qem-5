import { useState, useEffect } from 'react';
import { Target, ArrowLeft, Crosshair, Star } from 'lucide-react';
import type { GameType, GaugeType, BirdResult, Gun } from '../../types';
import { getTotalShots } from '../../utils/gameConfig';
import { StationLayout } from './StationLayout';
import { StartingStation } from './StartingStation';
import { useGuns } from '../../hooks/useGuns';

const GAME_TYPES: GameType[] = ['Skeet', 'Doubles Skeet', 'Trap', '5-Stand'];
const GAUGE_TYPES: GaugeType[] = ['12', '20', '28', '.410'];

interface ScoreEntryProps {
  onSubmit: (score: {
    game: GameType;
    gauge: GaugeType;
    birds: BirdResult[];
    total_score: number;
    starting_stand?: number;
  }) => void;
}

export function ScoreEntry({ onSubmit }: ScoreEntryProps) {
  const [game, setGame] = useState<GameType>('Skeet');
  const [gauge, setGauge] = useState<GaugeType>('12');
  const [selectedGunId, setSelectedGunId] = useState<string | null>(null);
  const [startingStation, setStartingStation] = useState<number>(1);
  const [birds, setBirds] = useState<BirdResult[]>([]);
  const { guns } = useGuns();

  // Find primary gun and filter guns by gauge
  const primaryGun = guns.find(g => g.isPrimary);
  const gaugeFilteredGuns = guns.filter(g => g.gauge === gauge);

  const handleBirdResult = (result: BirdResult) => {
    setBirds([...birds, result]);
  };

  const handleUndo = () => {
    setBirds(birds.slice(0, -1));
  };

  const handleSubmit = () => {
    // Count all hits including option shots
    const total_score = birds.filter(result => result === 'hit').length;

    const scoreData: Omit<Score, 'score_id' | 'shooter_id' | 'date'> = {
      game,
      gauge,
      birds,
      total_score,
      gun_id: selectedGunId,
      ...(game === 'Trap' || game === '5-Stand' ? { starting_stand: startingStation } : {})
    };

    onSubmit(scoreData);
    setBirds([]);
    setSelectedGunId(null);
  };

  const needsStartingStation = game === 'Trap' || game === '5-Stand';
  const isComplete = birds.length === getTotalShots(game);

  // Set primary gun as default when gauge matches
  useEffect(() => {
    if (primaryGun && primaryGun.gauge === gauge) {
      setSelectedGunId(primaryGun.id);
    } else {
      setSelectedGunId(null);
    }
  }, [gauge, primaryGun]);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Enter New Score
        </h3>
        
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Game Type
            </label>
            <select
              value={game}
              onChange={(e) => {
                setGame(e.target.value as GameType);
                setBirds([]);
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {GAME_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gauge
            </label>
            <select
              value={gauge}
              onChange={(e) => setGauge(e.target.value as GaugeType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {GAUGE_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gun Configuration
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gaugeFilteredGuns.length === 0 ? (
              <p className="text-sm text-gray-500 col-span-full">
                No {gauge} gauge guns configured. 
                <a href="/guns" className="text-indigo-600 hover:text-indigo-500 ml-1">
                  Add one now
                </a>
              </p>
            ) : (
              gaugeFilteredGuns.map((gun) => (
                <button
                  key={gun.id}
                  type="button"
                  onClick={() => setSelectedGunId(gun.id)}
                  className={`flex items-center p-3 border rounded-lg text-left transition-colors ${
                    selectedGunId === gun.id
                      ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Crosshair className="h-5 w-5 text-gray-400" />
                    {gun.isPrimary && (
                      <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {gun.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {gun.brand} {gun.model && `• ${gun.model}`}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {needsStartingStation && (
          <StartingStation
            game={game}
            station={startingStation}
            onChange={setStartingStation}
            disabled={birds.length > 0}
          />
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Birds: {birds.length} / {getTotalShots(game)}
            </span>
            {birds.length > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Undo
              </button>
            )}
          </div>

          <StationLayout
            game={game}
            birds={birds}
            onBirdResult={handleBirdResult}
            startingStation={startingStation}
          />

          {isComplete && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Target className="h-5 w-5 mr-2" />
                Submit Score
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}