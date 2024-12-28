export type GameType = 'Skeet' | 'Doubles Skeet' | 'Trap' | '5-Stand';
export type GaugeType = '12' | '20' | '28' | '.410';
export type BirdResult = 'hit' | 'miss';

export interface Score {
  score_id: string;
  shooter_id: string;
  game: GameType;
  gauge: GaugeType;
  date: string;
  starting_stand?: number;
  total_score: number;
  birds: BirdResult[];
  gun_id?: string | null;
}

export interface Statistics {
  straights: number;
  longest_streak: number;
}

export interface Shooter {
  shooter_id: string;
  name: string;
  handicap: number;
  scores: Score[];
  statistics: Statistics;
}