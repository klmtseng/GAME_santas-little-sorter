
export type Verdict = 'Nice' | 'Naughty' | 'Load' | 'Reject';

export interface Scenario {
  id: number;
  text: string;
  verdict: Verdict;
  reason: string;
  illustration: string; // Emoji/Sticker representation
}

export interface GameState {
  status: 'intro' | 'playing' | 'checking' | 'transition' | 'results';
  level: 1 | 2;
  score: number;
  maxScore: number;
  currentRound: number;
  history: { scenario: Scenario; choice: Verdict }[];
}
