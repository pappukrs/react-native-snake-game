export type Position = {
  x: number;
  y: number;
};

export type Direction = {
  x: number;
  y: number;
};

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export type DifficultySettings = {
  [key in DifficultyLevel]: {
    initialSpeed: number;
    speedDecrease: number;
    color: string;
  };
}; 