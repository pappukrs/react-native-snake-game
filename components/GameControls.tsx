import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { DIRECTIONS } from '../constants/game.constants';
import { Direction } from '../types/game.types';

type GameControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  onStart: () => void;
  onRestart: () => void;
  isGameStarted: boolean;
  gameOver: boolean;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const GameControls = memo(({ 
  onDirectionChange, 
  onStart, 
  onRestart,
  isGameStarted,
  gameOver
}: GameControlsProps) => {
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }]
  }));

  return (
    <View style={styles.controls}>
      <View style={styles.row}>
        <AnimatedTouchable 
          style={[styles.button, buttonAnimatedStyle]}
          onPress={() => onDirectionChange(DIRECTIONS.UP)}
        >
          <Ionicons name="chevron-up" size={30} color="#FFF" />
        </AnimatedTouchable>
      </View>

      <View style={styles.row}>
        <AnimatedTouchable 
          style={[styles.button, buttonAnimatedStyle]}
          onPress={() => onDirectionChange(DIRECTIONS.LEFT)}
        >
          <Ionicons name="chevron-back" size={30} color="#FFF" />
        </AnimatedTouchable>

        <AnimatedTouchable 
          style={[styles.centerButton, buttonAnimatedStyle]}
          onPress={gameOver ? onRestart : !isGameStarted ? onStart : undefined}
        >
          <Ionicons 
            name={gameOver ? "reload" : !isGameStarted ? "play" : "pause"} 
            size={35} 
            color={gameOver ? "#F44336" : !isGameStarted ? "#4CAF50" : "#FFC107"}
          />
        </AnimatedTouchable>

        <AnimatedTouchable 
          style={[styles.button, buttonAnimatedStyle]}
          onPress={() => onDirectionChange(DIRECTIONS.RIGHT)}
        >
          <Ionicons name="chevron-forward" size={30} color="#FFF" />
        </AnimatedTouchable>
      </View>

      <View style={styles.row}>
        <AnimatedTouchable 
          style={[styles.button, buttonAnimatedStyle]}
          onPress={() => onDirectionChange(DIRECTIONS.DOWN)}
        >
          <Ionicons name="chevron-down" size={30} color="#FFF" />
        </AnimatedTouchable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  controls: {
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#2A2A3E',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centerButton: {
    width: 70,
    height: 70,
    backgroundColor: '#3E3E5A',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    margin: 10,
    borderWidth: 2,
    borderColor: '#4A4A6A',
  },
}); 