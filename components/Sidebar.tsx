import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface SidebarProps {
  slideAnim: Animated.Value;
  onMenuItemPress: (menuItem: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ slideAnim, onMenuItemPress }) => (
  <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
    <View style={styles.sidebarContent}>
      <Text style={styles.sidebarTitle}>Menu</Text>
      {['How to Play', 'High Scores', 'Settings'].map((item) => (
        <TouchableOpacity 
          key={item}
          style={styles.sidebarItem}
          onPress={() => onMenuItemPress(item)}
        >
          <Text style={styles.sidebarItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#16213E',
    zIndex: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
}); 