import { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-av';
import { Position, Direction, DifficultyLevel } from '../types/game.types';
import { GRID_SIZE, DIRECTIONS, DIFFICULTY_SETTINGS } from '../constants/game.constants';

export const useGameLogic = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState<Direction>(DIRECTIONS.RIGHT);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('MEDIUM');
  const [speed, setSpeed] = useState<number>(DIFFICULTY_SETTINGS.MEDIUM.initialSpeed);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [eatSound, setEatSound] = useState<Audio.Sound | null>(null);
  const [gameOverSound, setGameOverSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async (soundFile: any) => {
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        return sound;
      } catch (error) {
        console.warn('Error loading sound:', error);
        return null;
      }
    };

    const loadSounds = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
      });

      const eat = await loadSound(require('../assets/sounds/eat.mp3'));
      const over = await loadSound(require('../assets/sounds/game-over.mp3'));
      
      setEatSound(eat);
      setGameOverSound(over);
    };

    loadSounds();

    return () => {
      if (eatSound) eatSound.unloadAsync();
      if (gameOverSound) gameOverSound.unloadAsync();
    };
  }, []);

  const playEatSound = async () => {
    try {
      if (eatSound) {
        await eatSound.replayAsync();
      }
    } catch (error) {
      console.warn('Error playing eat sound:', error);
    }
  };

  const playGameOverSound = async () => {
    try {
      if (gameOverSound) {
        await gameOverSound.replayAsync();
      }
    } catch (error) {
      console.warn('Error playing game over sound:', error);
    }
  };

  const generateFood = useCallback(() => {
    let newFood: Position;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;
      
      const isOnSnake = snake.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      );
      
      if (!isOnSnake) {
        return newFood;
      }
    } while (attempts < maxAttempts);

    return {
      x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
      y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
    };
  }, [snake]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(currentSnake => {
        const head = currentSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        if (
          newHead.x < 0 || 
          newHead.x >= GRID_SIZE || 
          newHead.y < 0 || 
          newHead.y >= GRID_SIZE ||
          currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          playGameOverSound();
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];
        
        if (newHead.x === food.x && newHead.y === food.y) {
          playEatSound();
          setFood(generateFood());
          setScore(prev => prev + 50);
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isGameStarted, gameOver, direction, food, speed, generateFood]);

  const changeDirection = useCallback((newDirection: { x: number; y: number }) => {
    setDirection(current => {
      if (
        (current.x === -newDirection.x && current.y === -newDirection.y) ||
        (current.x === newDirection.x && current.y === newDirection.y)
      ) {
        return current;
      }
      setTimeout(() => {
        setDirection(newDirection);
      }, 100);
      return current;
    });
  }, []);

  const startGame = useCallback(() => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection(DIRECTIONS.RIGHT);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsGameStarted(true);
  }, []);

  const restartGame = useCallback(() => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection(DIRECTIONS.RIGHT);
    setFood({ x: 10, y: 10 });
    setGameOver(false);
    setScore(0);
    setIsGameStarted(true);
  }, []);

  const changeDifficulty = useCallback((newDifficulty: DifficultyLevel) => {
    if (!isGameStarted) {
      setDifficulty(newDifficulty);
      const newSpeed = DIFFICULTY_SETTINGS[newDifficulty].initialSpeed;
      setSpeed(newSpeed);
      
      setSnake([{ x: 5, y: 5 }]);
      setDirection(DIRECTIONS.RIGHT);
      setFood(generateFood());
      setScore(0);
      setGameOver(false);
      
      console.log('Difficulty changed to:', newDifficulty, 'Speed:', newSpeed);
    }
  }, [isGameStarted, generateFood]);

  return {
    snake,
    direction,
    food,
    gameOver,
    score,
    difficulty,
    speed,
    isGameStarted,
    setDirection,
    changeDirection,
    startGame,
    restartGame,
    changeDifficulty
  };
}; 