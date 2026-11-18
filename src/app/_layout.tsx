import { Stack } from "expo-router";
import { colores } from "@/shared/theme/colores";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colores.superficie },
        headerTintColor: colores.texto,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Catálogo de Videojuegos" }} />
      <Stack.Screen name="videojuegos/nuevo" options={{ title: "Registrar videojuego" }} />
      <Stack.Screen name="videojuegos/[id]" options={{ title: "Editar videojuego" }} />
    </Stack>
  );
}
