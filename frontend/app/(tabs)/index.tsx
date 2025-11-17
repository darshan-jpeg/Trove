import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [word, setWord] = useState({
    word: "Resolute",
    meaning: "Firm and unwavering in purpose.",
    example: "She remained resolute despite the challenges.",
  });

  const getNewWord = () => {
    const words = [
      {
        word: "Lucid",
        meaning: "Clear and easy to understand.",
        example: "He gave a lucid explanation.",
      },
      {
        word: "Tactful",
        meaning: "Showing sensitivity in dealing with others.",
        example: "She handled the situation in a tactful way.",
      },
      {
        word: "Diligent",
        meaning: "Showing careful and persistent effort.",
        example: "He is a diligent student.",
      },
      {
        word: "Serene",
        meaning: "Calm, peaceful, and unbothered.",
        example: "The serene lake reflected the mountains.",
      },
    ];

    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trove</Text>

      <View style={styles.card}>
        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.meaning}>{word.meaning}</Text>
        <Text style={styles.example}>"{word.example}"</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={getNewWord}>
        <Text style={styles.buttonText}>New Word</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#F4F4F4",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    marginBottom: 20,
  },
  word: {
    fontSize: 32,
    fontWeight: "700",
  },
  meaning: {
    marginTop: 10,
    fontSize: 18,
    color: "#444",
  },
  example: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
