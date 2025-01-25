import React, { memo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameControls } from './GameControls';
import { DifficultySelector } from './DifficultySelector';
import { ScoreDisplay } from './ScoreDisplay';
import { GameGrid } from './GameGrid';

const GameBoard = memo(() => {
  const gameLogic = useGameLogic();
  
  return (
    <SafeAreaView style={styles.container}>
      <DifficultySelector 
        currentDifficulty={gameLogic.difficulty}
        onDifficultyChange={gameLogic.changeDifficulty}
        isGameStarted={gameLogic.isGameStarted}
      />
      
      <ScoreDisplay score={gameLogic.score} />
      
      <GameGrid 
        snake={gameLogic.snake}
        food={gameLogic.food}
        direction={gameLogic.direction}
      />
      
      <GameControls 
        onDirectionChange={gameLogic.changeDirection}
        onStart={gameLogic.startGame}
        onRestart={gameLogic.restartGame}
        isGameStarted={gameLogic.isGameStarted}
        gameOver={gameLogic.gameOver}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    paddingVertical: 20,
  },
});

export default GameBoard;
