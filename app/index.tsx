import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setLogged(!!token);
      } catch (e) {
        setLogged(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return logged ? (
    <Redirect href="/(tabs)/asistencia" />
  ) : (
    <Redirect href="/auth" />
  );
}