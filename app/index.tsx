import React from "react";
import { View, StyleSheet } from "react-native";
import GameBoard from "../components/GameBoard";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Overlay } from "@/components/Overlay";
import useSidebar from "../hooks/useSidebar";

export default function Home() {
  const { isOpen, slideAnim, toggle } = useSidebar();

  const handleMenuItemPress = (menuItem: string) => {
    // Handle menu item press
    console.log(`Selected menu item: ${menuItem}`);
    toggle();
  };

  return (
    <View style={styles.container}>
      <Header onMenuPress={toggle} />
      <Sidebar slideAnim={slideAnim} onMenuItemPress={handleMenuItemPress} />
      <View style={styles.content}>
        <GameBoard />
      </View>
      {isOpen && <Overlay onPress={toggle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
  content: {
    flex: 1,
  },
});
