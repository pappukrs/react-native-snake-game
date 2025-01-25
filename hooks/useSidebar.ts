import { useState, useRef } from 'react';
import { Animated } from 'react-native';

interface SidebarHook {
  isOpen: boolean;
  slideAnim: Animated.Value;
  toggle: () => void;
}

const useSidebar = (): SidebarHook => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const toggle = () => {
    const toValue = isOpen ? -250 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    slideAnim,
    toggle,
  };
};

export default useSidebar; 