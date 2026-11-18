import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Boton } from "@/shared/components/Boton";
import { colores } from "@/shared/theme/colores";
import type { Videojuego } from "../../domain/entities/Videojuego";
import { VideojuegoCard } from "../components/VideojuegoCard";
import { useVideojuegos } from "../hooks/useVideojuegos";

export function ListaVideojuegosScreen() {
  const router = useRouter();
  const { videojuegos, cargando, refrescando, error, refrescar, eliminar } =
    useVideojuegos();

  function confirmarEliminar(videojuego: Videojuego) {
    Alert.alert(
      "Eliminar videojuego",
      `¿Eliminar "${videojuego.titulo}"? No se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const eliminado = await eliminar(videojuego.id);
            if (!eliminado) {
              Alert.alert("Error", "No se pudo eliminar el videojuego.");
            }
          },
        },
      ],
    );
  }

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colores.primario} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={videojuegos}
        keyExtractor={(videojuego) => videojuego.id}
        renderItem={({ item }) => (
          <VideojuegoCard
            videojuego={item}
            onEditar={() =>
              router.push({ pathname: "/videojuegos/[id]", params: { id: item.id } })
            }
            onEliminar={() => confirmarEliminar(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={
          <Text style={styles.vacio}>Aún no hay videojuegos registrados.</Text>
        }
        contentContainerStyle={styles.lista}
        refreshing={refrescando}
        onRefresh={refrescar}
      />

      <View style={styles.pie}>
        <Boton
          titulo="+ Agregar Videojuego"
          onPress={() => router.push("/videojuegos/nuevo")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  centro: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  lista: { padding: 16 },
  separador: { height: 12 },
  vacio: { textAlign: "center", color: colores.textoSuave, marginTop: 32 },
  error: { color: colores.error, fontSize: 16, textAlign: "center" },
  pie: { padding: 16 },
});
