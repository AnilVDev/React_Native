import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Share } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const data = [
  { id: '1', image: require('../../../assets/images/chair/chair1.jpeg') },
  { id: '2', image: require('../../../assets/images/chair/chair2.jpeg') },
  { id: '3', image: require('../../../assets/images/chair/chair3.jpeg') },
];


const colors = [
  {
    name: 'Harvest Gold',
    hex: '#E4B04A',
    price: {
      current: 230.00,
      original: 512.58,
      discount: '45% OFF',
      currencyCode: 'USD',
    },
  },
  {
    name: 'Eerie Black',
    hex: '#1B1B1B',
    price: {
      current: 245.00,
      original: 545.58,
      discount: '45% OFF',
      currencyCode: 'USD',
    },
  },
  {
    name: 'Flame',
    hex: '#E45627',
    price: {
      current: 235.00,
      original: 522.58,
      discount: '45% OFF',
      currencyCode: 'USD',
    },
  },
  {
    name: 'Pakistan Green',
    hex: '#006600',
    price: {
      current: 240.00,
      original: 533.58,
      discount: '45% OFF',
      currencyCode: 'USD',
    },
  },
];

const screenWidth = Dimensions.get('window').width;


export default function ProductDetailScreen({ scrollToReviews }) {
  const [selectedImage, setSelectedImage] = useState(data[0].image);
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default to first color

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleShare = async () => {
    try {
      const message = `Check out this product: EKERO in ${selectedColor.name} color for just $${selectedColor.price.current.toFixed(2)}!`;
      await Share.share({
        message,
      });
    } catch (error) {
      console.log('Error sharing product:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* Best Seller Tag */}
      <View style={styles.bestSellerTag}>
        <Text style={styles.bestSellerText}>Best Seller</Text>
      </View>

      <Image source={selectedImage} style={styles.mainImage} />

      {/* Thumbnail Selector */}
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
            <Image 
              source={item.image}
              style={[
                styles.thumbnail, 
                selectedImage === item.image && styles.selectedThumbnail
              ]}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.thumbnailContainer}
      />

      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.productName}>EKERO</Text>
          <TouchableOpacity onPress={handleShare}>
            <MaterialCommunityIcons name="upload" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Price Section */}
        {selectedColor && (
          <View style={styles.priceOuterContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ${selectedColor.price.current.toFixed(2)}
              </Text>
              <Text style={styles.originalPrice}>
                ${selectedColor.price.original.toFixed(2)}
              </Text>
              <Text style={styles.discount}>
                {selectedColor.price.discount}
              </Text>
            </View>
          </View>
        )}
      <TouchableOpacity onPress={scrollToReviews}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ 4.9</Text>
          <Text style={styles.reviewCount}>(256)</Text>
        </View>
      </TouchableOpacity>
        <Text style={styles.description}>
          A minimalist chair with a reversible back cushion provides soft support for your back and has two sides to wear.
        </Text>

        {/* Color Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colors</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorItem,
                  { borderColor: selectedColor === color ? 'green' : 'rgba(0, 0, 255, 0.1)' },
                ]}
                onPress={() => handleColorSelection(color)}
              >
                <View style={[styles.colorBox, { backgroundColor: color.hex }]} />
                <Text style={styles.colorName}>{color.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  bestSellerTag: {
    backgroundColor: '#E44A4A',
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 60,
    left: 0,
    zIndex: 1,
  },
  bestSellerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainImage: {
    width: screenWidth - 40,
    alignSelf: "center",
    height: 300,
    borderRadius: 10,
    resizeMode:"cover"
  },
  thumbnailContainer: {
    paddingHorizontal: 10,
    paddingVertical:20,
    marginTop: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedThumbnail: {
    borderWidth:2,
    borderColor: '#115543',
  },
  detailsContainer: {  
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, 
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4, 
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 10,
  },
  discount: {
    backgroundColor:"#E44A4A",
    padding:5,
    fontSize: 12,
    color: 'white',
    borderTopLeftRadius:8,
    borderEndEndRadius:8
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    lineHeight: 24, 
  },
  section: {
    marginTop: 10,
    padding:15,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth:1
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  colorName: {
    fontSize: 16,
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionDetails: {
    marginTop: 10,
  },
  productText: {
    fontSize: 16,
  },
  sizeDetails: {
    marginTop: 10,
  },
  sizeRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  sizeLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  dimensionImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },  
});