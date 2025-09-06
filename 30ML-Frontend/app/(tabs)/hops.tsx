import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HopsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hops Screen</Text>
      <Text>This is the content for the Hops tab.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});