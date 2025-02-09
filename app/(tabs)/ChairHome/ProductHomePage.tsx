import React, { useRef } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import ProductDetailScreen from './ProductDetailScreen';
import ProductDescriptions from './ProductDescriptions';
import Review from './Review';
import FrequentlyBought from './FrequentlyBought';

export default function ProductHomePage() {
  const flatListRef  = useRef(null); 

  const reviewSectionRef = useRef(null);

  const scrollToReviews = () => {
    flatListRef.current?.scrollToIndex({ index: 2, animated: true });
  };

  const components = [
    { id: '1', component: <ProductDetailScreen scrollToReviews={scrollToReviews}  /> },
    { id: '2', component: <ProductDescriptions /> },
    { id: '3', component: <Review/>},
    { id: '4', component: <FrequentlyBought/>}
  ];

  return (
    <FlatList
      data={components}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View style={styles.itemContainer}>{item.component}</View>}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => null}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
      }}
    />
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  itemContainer: {
    marginBottom: 20,
  },
});
