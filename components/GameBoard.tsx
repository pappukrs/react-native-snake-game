import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const GRID_SIZE = 15; // Grid dimensions (15x15)
const CELL_SIZE = 20; // Size of each cell in pixels

// Directions: up, right, down, left
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
};

export default function GameBoard() {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]); // Initial snake position
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [food, setFood] = useState({ x: 10, y: 10 }); // Initial food position
  const [gameOver, setGameOver] = useState(false);

  // Move the snake every 200ms
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  // Move the snake
  const moveSnake = () => {
    const head = snake[0];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };

    // Check for wall collisions
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE ||
      isCollidingWithSnake(newHead)
    ) {
      setGameOver(true);
      return;
    }

    // Move the snake
    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      // If the snake eats the food, generate new food
      setFood(generateFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Check if the snake collides with itself
  const isCollidingWithSnake = (head) => {
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  // Generate random food location
  const generateFood = () => {
    let x = Math.floor(Math.random() * GRID_SIZE);
    let y = Math.floor(Math.random() * GRID_SIZE);
    // Make sure the food doesn't spawn on the snake
    while (snake.some((segment) => segment.x === x && segment.y === y)) {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
    }
    return { x, y };
  };

  // Handle direction change
  const changeDirection = (newDirection) => {
    // Prevent the snake from turning 180 degrees (e.g., cannot turn from right to left)
    if (
      (direction.x === 0 && newDirection.x === 0) ||
      (direction.y === 0 && newDirection.y === 0)
    ) {
      setDirection(newDirection);
    }
  };

  // Render the game board
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                isSnake && styles.snake,
                isFood && styles.food,
              ]}
            />
          );
        })}
      </View>

      {/* Direction Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.UP)} style={styles.button}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.LEFT)} style={styles.button}>
            <Text style={styles.buttonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.RIGHT)} style={styles.button}>
            <Text style={styles.buttonText}>Right</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => changeDirection(DIRECTIONS.DOWN)} style={styles.button}>
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity>
      </View>

      {gameOver && <Text style={styles.gameOver}>Game Over</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  board: {
    width: GRID_SIZE * CELL_SIZE,
    height: GRID_SIZE * CELL_SIZE,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#222",
    borderColor: "#00FF00",
    borderWidth: 2,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: "#333",
  },
  snake: {
    backgroundColor: "#00FF00",
  },
  food: {
    backgroundColor: "red",
  },
  controls: {
    marginTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  gameOver: {
    color: "#FF0000",
    fontSize: 24,
    marginTop: 20,
  },
});
