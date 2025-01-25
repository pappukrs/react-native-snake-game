import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Position } from '../types/game.types';
import { GRID_SIZE, CELL_SIZE, DIRECTIONS } from '../constants/game.constants';

type GameGridProps = {
  snake: Position[];
  food: Position;
  direction: { x: number; y: number };
};

export const GameGrid = memo(({ snake, food, direction }: GameGridProps) => {
  const renderCell = (rowIndex: number, colIndex: number) => {
    const isSnake = snake.some(segment => segment.x === colIndex && segment.y === rowIndex);
    const isFood = food.x === colIndex && food.y === rowIndex;
    const isHead = snake[0].x === colIndex && snake[0].y === rowIndex;

    let rotation = '0deg';
    if (isHead) {
      if (direction.x === 1) rotation = '0deg';
      else if (direction.x === -1) rotation = '180deg';
      else if (direction.y === -1) rotation = '270deg';
      else if (direction.y === 1) rotation = '90deg';
    }

    return (
      <View
        key={`${rowIndex}-${colIndex}`}
        style={[
          styles.cell,
          isSnake && styles.snakeCell,
          isHead && [styles.snakeHead, { transform: [{ rotate: rotation }] }],
          isFood && styles.foodCell,
        ]}
      >
        {isHead && (
          <>
            <View style={[styles.eye, styles.leftEye]} />
            <View style={[styles.eye, styles.rightEye]} />
            <View style={styles.mouth} />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.gridContainer}>
      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, colIndex) =>
              renderCell(rowIndex, colIndex)
            )}
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 10,
  },
  grid: {
    backgroundColor: '#242442',
    borderWidth: 2,
    borderColor: '#30305A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#1E1E36',
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  snakeCell: {
    backgroundColor: '#50FA7B',
    borderWidth: 0,
  },
  snakeHead: {
    backgroundColor: '#69FF93',
    borderWidth: 0,
    position: 'relative',
    zIndex: 2,
  },
  eye: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    top: 6,
  },
  leftEye: {
    left: 4,
  },
  rightEye: {
    right: 4,
  },
  mouth: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',
    right: 6,
    top: 12,
  },
  foodCell: {
    backgroundColor: '#FF5555',
    borderWidth: 0,
  },
}); 