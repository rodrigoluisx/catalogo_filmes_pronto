import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#171923" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#0F1117" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Catálogo de Filmes" }} />
        <Stack.Screen name="consultar_filmes" options={{ title: "Consultar filmes" }} />
        <Stack.Screen name="cadastrar_filme" options={{ title: "Cadastrar filme" }} />
      </Stack>
    </>
  );
}
