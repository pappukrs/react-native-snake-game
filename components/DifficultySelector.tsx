import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DifficultyLevel } from '../types/game.types';
import { DIFFICULTY_SETTINGS } from '../constants/game.constants';

type DifficultySelectorProps = {
  currentDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  isGameStarted: boolean;
};

export const DifficultySelector = memo(({ 
  currentDifficulty, 
  onDifficultyChange,
  isGameStarted 
}: DifficultySelectorProps) => {
  const difficulties: DifficultyLevel[] = ['EASY', 'MEDIUM', 'HARD'];

  return (
    <View style={styles.container}>
      {difficulties.map((difficulty) => {
        const isActive = currentDifficulty === difficulty;
        const isDisabled = isGameStarted;
        const difficultyColor = DIFFICULTY_SETTINGS[difficulty].color;
        
        return (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.button,
              isActive && [styles.activeButton, { borderColor: difficultyColor }],
              isDisabled && styles.disabledButton,
            ]}
            onPress={() => !isDisabled && onDifficultyChange(difficulty)}
            disabled={isDisabled}
          >
            <Text style={[
              styles.buttonText,
              isActive && { color: difficultyColor },
              isDisabled && styles.disabledText
            ]}>
              {difficulty}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#242442',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2E2E4A',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2E2E4A',
    minWidth: 75,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#1A472A',  // Darker green background for active state
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disabledText: {
    color: '#666',
  },
}); 