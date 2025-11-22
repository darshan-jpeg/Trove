import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trove</Text>
      <Text style={styles.subtitle}>Create Account</Text>

      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() => router.replace("/")}
      >
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
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 36, fontWeight: "700", textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 20 },
  googleBtn: {
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  googleText: { color: "white", textAlign: "center", fontSize: 16 },
  backBtn: { marginTop: 20 },
  backText: { color: "#007AFF", textAlign: "center" },
});
