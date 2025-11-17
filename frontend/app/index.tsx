import { useEffect } from "react";
import { View, ActivityIndicator, InteractionManager } from "react-native";
import { useRouter } from "expo-router";

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      router.replace("/(auth)/login");
    });

    return () => {
      // cancel if still pending
      if (task && typeof (task as any).cancel === "function") {
        (task as any).cancel();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
