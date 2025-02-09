import { View, Text, StyleSheet } from "react-native";

export default function SeeMore() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the See More Page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
