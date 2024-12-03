import { View, Text, StyleSheet, Button } from "react-native";

import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Expo Router !</Text>
      <Button
        title="go to authentification"
        onPress={() => {
          router.push("/login");
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
