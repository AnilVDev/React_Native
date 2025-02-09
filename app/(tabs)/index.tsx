
import React from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet } from 'react-native';
import ProductHomePage from './ChairHome/ProductHomePage';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Render Product Home Page or List */}
      <FlatList
        data={[{ key: 'productPage' }]}
        renderItem={() => <ProductHomePage />}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // font:Manrope
  },
});
