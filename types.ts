export interface Level {
  id: number;
  title: string;
  description: string;
  digits: number; // 1, 2, 3
  rows: number; // default 5
  minVal: number;
  maxVal: number;
  allowNegative: boolean;
  timeLimitSeconds: number; // default 180 (3 mins)
  passingPct: number; // default 70
}

export interface Question {
  id: string;
  numbers: number[];
  correctAnswer: number;
  options: number[];
}

export interface TestAttempt {
  id: string;
  levelId: number;
  levelTitle: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  scorePct: number;
  timeUsedSeconds: number;
  passed: boolean;
  userAnswers: Record<number, number>; // questionIndex -> chosenAnswer
}

export interface UserAccount {
  email: string;
  name: string;
  passwordHash: string; // simple demo hash or stored password
  unlockedLevel: number;
  attempts: TestAttempt[];
  createdAt: string;
  isAdmin?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: { current: number; target: number };
}

export interface AdminCustomQuestion {
  id: string;
  levelId: number;
  numbers: number[];
  correctAnswer: number;
}
