import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type GameButtonsProps = {
  gameState: {
    isGameStarted: boolean;
    gameOver: boolean;
  };
  onStart: () => void;
  onRestart: () => void;
};

export const GameButtons: React.FC<GameButtonsProps> = ({
  gameState,
  onStart,
  onRestart,
}) => {
  return (
    <View style={styles.container}>
      {!gameState.isGameStarted && !gameState.gameOver && (
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      )}
      {gameState.gameOver && (
        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4A5568',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
}); 