import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface OverlayProps {
  onPress: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
    zIndex: 1, // ensure it's above other content but below the sidebar
  },
});