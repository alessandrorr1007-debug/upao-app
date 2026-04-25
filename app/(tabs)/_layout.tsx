import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>

      {/* 🔝 BARRA SUPERIOR (GLOBAL, VACÍA) */}
      <View style={styles.topBar} />

      {/* STACK DE TODA LA APP */}
      <Stack screenOptions={{ headerShown: false }} />

    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    backgroundColor: '#0A1F44',
  },
});