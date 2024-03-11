import { QuizContext } from "@/components/QuizProvider";
import { useContext } from "react";

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
}