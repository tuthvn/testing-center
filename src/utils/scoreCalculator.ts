import { Question } from '../types/exam';

export const calculateScore = (
  questions: Question[],
  answers: Record<number, number[]>
): { score: number; correctAnswers: number } => {
  let correct = 0;

  questions.forEach((question, index) => {
    const userAnswers = answers[index] || [];
    const correctAnswers = question.correctAnswers;

    if (
      userAnswers.length === correctAnswers.length &&
      userAnswers.every(answer => correctAnswers.includes(answer))
    ) {
      correct++;
    }
  });

  return {
    score: (correct / questions.length) * 100,
    correctAnswers: correct
  };
};