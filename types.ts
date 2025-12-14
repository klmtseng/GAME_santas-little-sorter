export type Verdict = 'Nice' | 'Naughty';

export interface Scenario {
  id: number;
  text: string;
  verdict: Verdict;
  reason: string;
  illustration: string; // Emoji/Sticker representation
}

export interface GameState {
  status: 'intro' | 'playing' | 'checking' | 'results';
  score: number;
  currentRound: number;
  history: { scenario: Scenario; choice: Verdict }[];
}
