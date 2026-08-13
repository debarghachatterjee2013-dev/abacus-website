import { Level, Question } from '../types';

export function generateTestQuestions(level: Level, count: number = 80): Question[] {
  const questions: Question[] = [];
  const uniqueSignatures = new Set<string>();

  let attempts = 0;
  while (questions.length < count && attempts < 2000) {
    attempts++;
    const numbers: number[] = [];
    let runningSum = 0;

    for (let r = 0; r < level.rows; r++) {
      let num = Math.floor(Math.random() * (level.maxVal - level.minVal + 1)) + level.minVal;
      
      // If subtraction is allowed, randomly make some numbers negative (except maybe the first number to ensure positive start)
      if (level.allowNegative && r > 0 && Math.random() > 0.4) {
        num = -num;
      }

      // Check running sum to ensure we don't go into unreasonable negative ranges if not desired, or keep it valid
      if (runningSum + num < 0) {
        num = Math.abs(num); // force positive if negative drops below 0
      }

      numbers.push(num);
      runningSum += num;
    }

    const correctAnswer = runningSum;

    // Signature to prevent exact duplicate questions in the exam
    const sig = numbers.join(',');
    if (uniqueSignatures.has(sig)) continue;
    uniqueSignatures.add(sig);

    // Generate 3 realistic distractors
    const optionsSet = new Set<number>([correctAnswer]);
    
    while (optionsSet.size < 4) {
      const offsetChoices = [
        Math.floor(Math.random() * 5) + 1,
        -(Math.floor(Math.random() * 5) + 1),
        Math.floor(Math.random() * 10) + 1,
        -(Math.floor(Math.random() * 10) + 1),
        10, -10, 1, -1, 5, -5
      ];
      const offset = offsetChoices[Math.floor(Math.random() * offsetChoices.length)];
      const fake = correctAnswer + offset;
      
      if (fake >= 0 && fake !== correctAnswer) {
        optionsSet.add(fake);
      }
    }

    const options = Array.from(optionsSet);
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    questions.push({
      id: `q-${questions.length + 1}-${Math.random().toString(36).substring(2, 6)}`,
      numbers,
      correctAnswer,
      options,
    });
  }

  // If we couldn't get 80 due to strict constraints, pad with extra generated questions
  while (questions.length < count) {
    const numbers: number[] = [];
    let sum = 0;
    for (let r = 0; r < level.rows; r++) {
      const n = Math.floor(Math.random() * (level.maxVal - level.minVal + 1)) + level.minVal;
      numbers.push(n);
      sum += n;
    }
    const correctAnswer = sum;
    const optionsSet = new Set<number>([correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 10]);
    const options = Array.from(optionsSet).slice(0, 4);
    // Shuffle
    options.sort(() => Math.random() - 0.5);

    questions.push({
      id: `q-pad-${questions.length + 1}`,
      numbers,
      correctAnswer,
      options,
    });
  }

  return questions;
}
