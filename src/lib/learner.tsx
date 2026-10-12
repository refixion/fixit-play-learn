import { createContext, useContext, useState, type ReactNode } from "react";

const LearnerContext = createContext<{
  completed: number; hearts: number; xp: number; gems: number; pro: boolean; sound: boolean;
  setPro: (value: boolean) => void; setSound: (value: boolean) => void;
  loseHeart: () => void; refillHearts: () => void; finishLesson: (index: number) => void;
} | null>(null);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [pro, setPro] = useState(false);
  const [sound, setSound] = useState(true);
  return <LearnerContext.Provider value={{ completed, hearts, xp: completed * 15, gems: completed * 5, pro, sound, setPro, setSound,
    loseHeart: () => setHearts(value => Math.max(0, value - 1)),
    refillHearts: () => setHearts(5),
    finishLesson: index => setCompleted(value => index === value ? value + 1 : value),
  }}>{children}</LearnerContext.Provider>;
}

export function useLearner() {
  const value = useContext(LearnerContext);
  if (!value) throw new Error("LearnerProvider is required");
  return value;
}