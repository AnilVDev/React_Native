import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = 180;

const data = [
      {
        name: "STRANDMON",
        price: 274.13,
        originalPrice: 866.60,
        discount: "45% OFF",
        rating: {
          score: 4.8,
          totalReviews: 128
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%201.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%201.png"
        }
      },
      {
        name: "POÄNG",
        price: 189.99,
        originalPrice: 349.99,
        discount: "46% OFF",
        rating: {
          score: 4.7,
          totalReviews: 342
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%202.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%202.png"
        }
      },
      {
        name: "KIVIK",
        price: 425.00,
        originalPrice: 849.99,
        discount: "50% OFF",
        rating: {
          score: 4.6,
          totalReviews: 189
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%203.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%203.png"
        }
      },
      {
        name: "FÄRLÖV",
        price: 299.99,
        originalPrice: 599.99,
        discount: "50% OFF",
        rating: {
          score: 4.5,
          totalReviews: 156
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%204.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%204.png"
        }
      },
      {
        name: "SÖDERHAMN",
        price: 349.50,
        originalPrice: 699.00,
        discount: "50% OFF",
        rating: {
          score: 4.9,
          totalReviews: 234
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%202.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%202.png"
        }
      },
      {
        name: "EKTORP",
        price: 279.99,
        originalPrice: 559.99,
        discount: "50% OFF",
        rating: {
          score: 4.7,
          totalReviews: 421
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%201.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%201.png"
        }
      },
      {
        name: "LANDSKRONA",
        price: 399.99,
        originalPrice: 799.99,
        discount: "50% OFF",
        rating: {
          score: 4.8,
          totalReviews: 167
        },
        images: {
          primary: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%204.png",
          thumbnail: "https://lowmesiv.sirv.com/appmaker%20test/grid%20image%204.png"
        }
      }
    ]

  

export default function FrequentlyBought() {
    const router = useRouter()
    const scrollX = useRef(new Animated.Value(0)).current;
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      <Image source={{ uri: item.images.primary }} style={styles.productImage} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.discountPrice}>${item.originalPrice.toFixed(2)}</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.star}>⭐</Text>
        <Text>{item.rating.score}({item.rating.totalReviews})</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Frequently Bought</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/SeeMore")}>
          <Text style={styles.seeMoreButton}>See More</Text>
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      /> */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.scrollIndicatorContainer}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * ITEM_WIDTH, i * ITEM_WIDTH, (i + 1) * ITEM_WIDTH];
          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { transform: [{ scale: dotScale }] }]}
            />
          );
        })}
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  seeMoreButton: { 
    color: "#115543", 
    fontSize: 16,
    fontWeight: "bold" ,
    
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    width: 160,
  },
  discountBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopLeftRadius: 10,
    borderBottomRightRadius:10,
    alignSelf: 'flex-start',
    top:135,
    zIndex:1
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    marginVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  discountPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    color: '#FFD700',
    marginRight: 5,
  },
  scrollIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#115543',
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
