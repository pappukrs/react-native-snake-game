import { Direction, DifficultySettings } from '../types/game.types';

export const GRID_SIZE = 15;
export const CELL_BORDER = 0.5;
export const BOARD_BORDER = 3;
export const BASE_CELL_SIZE = 20;
export const CELL_SIZE = 20;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
} as const;

export const SPEEDS = {
  easy: 400,
  normal: 300,
  hard: 200,
} as const;

export const DIFFICULTY_SETTINGS: DifficultySettings = {
  EASY: { 
    initialSpeed: 600,
    speedDecrease: 5,
    color: '#4CAF50'
  },
  MEDIUM: { 
    initialSpeed: 450,
    speedDecrease: 4,
    color: '#FFC107'
  },
  HARD: { 
    initialSpeed: 300,
    speedDecrease: 3,
    color: '#F44336'
  },
}; 