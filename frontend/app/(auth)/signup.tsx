import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const handleGoogleSignup = async () => {
    // simulate Google sign-up flow
    // replace this with real Google auth if needed
    try {
      // pretend signup succeeds
      router.replace("/(tabs)");
    } catch (e) {
      Alert.alert("Error", "Google sign-up failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trove</Text>
      <Text style={styles.subtitle}>Sign up with Google</Text>

      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 36, fontWeight: "700", marginBottom: 6 },
  subtitle: { fontSize: 18, color: "#333", marginBottom: 24 },
  googleBtn: { backgroundColor: "#DB4437", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  googleText: { color: "white", fontSize: 16, fontWeight: "600" },
  backBtn: { marginTop: 18 },
  backText: { color: "blue" },
});