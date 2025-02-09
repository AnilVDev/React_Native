import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProductDescriptions() {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isSizeExpanded, setSizeExpanded] = useState(false);

 

  const toggleDescriptionExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleSizeExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSizeExpanded(!isSizeExpanded);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Product Description */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.sizeHeader} onPress={toggleDescriptionExpansion}>
          <Text style={styles.sectionTitle}>Product Description</Text>
            <MaterialCommunityIcons
              name={isSizeExpanded ? 'chevron-up' : 'chevron-down'}
              size={30}
              color="black"
            />
        </TouchableOpacity>

        {isDescriptionExpanded && (
          <View style={styles.descriptionDetails}>
            <Text style={styles.productText}>
            Choose a stylish dark color or brighten up your home with colorful savings. The EKERO armchair has a sleek and modern look with two sides that meet at the back - and a waist support for added comfort!
            </Text>
          </View>
        )}
      </View>

      {/* Size */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.sizeHeader} onPress={toggleSizeExpansion}>
          <Text style={styles.sectionTitle}>Size</Text>
            <MaterialCommunityIcons
              name={isSizeExpanded ? 'chevron-up' : 'chevron-down'}
              size={30}
              color="black"
            />
        </TouchableOpacity>

        {isSizeExpanded && (
          <View style={styles.sizeDetails}>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Width:</Text>
              <Text>70 cm</Text>
            </View>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Depth:</Text>
              <Text>73 cm</Text>
            </View>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Height:</Text>
              <Text>75 cm</Text>
            </View>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Seat Width:</Text>
              <Text>57 cm</Text>
            </View>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Seat Depth:</Text>
              <Text>46 cm</Text>
            </View>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>Seat Height:</Text>
              <Text>43 cm</Text>
            </View>
            {/* Image with dimensions */}
            <Image
              source={require('../../../assets/images/chair/chair_dimension.jpeg')}
              style={styles.dimensionImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
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
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth:1,
    paddingBottom:5
  },
  sizeLabel: {
    // fontWeight: 'bold',
    width: 100,
  },
  dimensionImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
