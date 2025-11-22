import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert("Please fill all fields");
      return;
    }
    router.replace("/(tabs)/home");
  };

  const handleSignup = () => {
    if (!email.trim() || !password || !confirm || !name.trim()) {
      Alert.alert("Fill all fields");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trove</Text>
      <Text style={styles.subtitle}>
        {mode === "login" ? "Login" : "Create Account"}
      </Text>

      {mode === "signup" && (
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {mode === "signup" && (
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          style={styles.input}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={mode === "login" ? handleLogin : handleSignup}
      >
        <Text style={styles.buttonText}>
          {mode === "login" ? "Login" : "Sign up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setMode((prev) => (prev === "login" ? "signup" : "login"))
        }
      >
        <Text style={styles.linkText}>
          {mode === "login"
            ? "Don’t have an account? Sign up"
            : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 40, fontWeight: "700", textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 20, fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  linkText: { textAlign: "center", marginTop: 18, color: "#007AFF" },
});
