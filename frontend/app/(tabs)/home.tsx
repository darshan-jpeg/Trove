import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [style, setStyle] = useState<"formal" | "casual" | "rare">("formal");
  const [word, setWord] = useState({ word: "", meaning: "", example: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://trove-zeta.vercel.app/api/generate";

  const fetchWord = async (type: "formal" | "casual" | "rare") => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}?style=${type}`);
      const data = await res.json();
      setWord(data);
    } catch (e) {
      setError("Failed to load word");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord(style);
  }, [style]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trove</Text>

      <View style={styles.row}>
        {(["formal", "casual", "rare"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.styleBtn, style === t && styles.active]}
            onPress={() => setStyle(t)}
          >
            <Text style={[styles.styleText, style === t && styles.activeText]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.word}>{word.word}</Text>
            <Text style={styles.meaning}>{word.meaning}</Text>
            <Text style={styles.example}>{word.example}</Text>
          </>
        )}

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 42, fontWeight: "700", textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  styleBtn: { padding: 10, borderWidth: 1, borderRadius: 8, flex: 1, marginHorizontal: 4 },
  active: { backgroundColor: "black" },
  styleText: { textAlign: "center", textTransform: "capitalize" },
  activeText: { color: "white" },
  card: { padding: 20, backgroundColor: "#f4f4f4", borderRadius: 10 },
  word: { fontSize: 30, fontWeight: "bold" },
  meaning: { marginTop: 8, fontSize: 18 },
  example: { marginTop: 8, fontStyle: "italic" },
});
