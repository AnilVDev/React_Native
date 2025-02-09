import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";

export default function Layout() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);

      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Item added to cart!");
      }, 2000);
    };

  const toggleLike = () => setLiked(!liked);

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false, 
          }}
        >
        </Stack>
      </View>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleLike} style={styles.wishlist}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={"#115543"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.addToCartText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wishlist: {
    borderRadius: 10,
    borderColor: "#115543",
    borderWidth: 3,
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: "#115543",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
