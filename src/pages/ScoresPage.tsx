import Layout from '../components/Layout';
import { ScoreEntry } from '../components/scores/ScoreEntry';
import { ScoreDots } from '../components/scores/ScoreDots';
import { useState } from 'react';
import type { Score } from '../types';

export default function ScoresPage() {
  const [scores, setScores] = useState<Score[]>([]);

  const handleScoreSubmit = (score: Omit<Score, 'score_id' | 'shooter_id' | 'date'>) => {
    const newScore: Score = {
      score_id: crypto.randomUUID(),
      shooter_id: 'current-user', // TODO: Get from auth
      date: new Date().toISOString(),
      ...score
    };
    setScores([newScore, ...scores]);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Scores</h1>
        
        <div className="space-y-6">
          <ScoreEntry onSubmit={handleScoreSubmit} />

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Scores</h2>
              
              {scores.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No scores recorded yet</p>
              ) : (
                <div className="space-y-4">
                  {scores.map((score) => (
                    <div 
                      key={score.score_id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{score.game}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(score.date).toLocaleDateString()} • {score.gauge} gauge
                          {(score.game === 'Trap' || score.game === '5-Stand') && score.starting_stand && (
                            <> • Station {score.starting_stand}</>
                          )}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {score.total_score}/25
                      </div>
                      <ScoreDots birds={score.birds} className="mt-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}