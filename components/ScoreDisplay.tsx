import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withSequence
} from 'react-native-reanimated';

type ScoreDisplayProps = {
  score: number;
};

export const ScoreDisplay = memo(({ score }: ScoreDisplayProps) => {
  const scoreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(1.2, { damping: 10 }),
          withSpring(1, { damping: 15 })
        )
      }
    ]
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SCORE</Text>
      <Animated.Text style={[styles.score, scoreAnimatedStyle]}>
        {String(score).padStart(3, '0')}
      </Animated.Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#2A2A3E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
  },
  score: {
    color: '#50FA7B',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
}); 