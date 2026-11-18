import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores } from "@/shared/theme/colores";
import type { Videojuego } from "../../domain/entities/Videojuego";

type Props = {
  videojuego: Videojuego;
  onEditar: () => void;
  onEliminar: () => void;
};

export function VideojuegoCard({ videojuego, onEditar, onEliminar }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.genero}>{videojuego.genero}</Text>
      <Text style={styles.titulo}>{videojuego.titulo}</Text>
      <Text style={styles.plataforma}>{videojuego.plataforma}</Text>
      <Text style={styles.descripcion}>{videojuego.descripcion}</Text>

      <View style={styles.acciones}>
        <Pressable onPress={onEditar} accessibilityRole="button">
          <Text style={styles.accionEditar}>Editar</Text>
        </Pressable>
        <Pressable onPress={onEliminar} accessibilityRole="button">
          <Text style={[styles.accionEditar, styles.peligro]}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    gap: 4,
  },
  genero: {
    fontSize: 12,
    fontWeight: "700",
    color: colores.acento,
    textTransform: "uppercase",
  },
  titulo: { fontSize: 18, fontWeight: "700", color: colores.texto },
  plataforma: { fontSize: 14, color: colores.textoSuave },
  descripcion: { fontSize: 15, color: colores.texto, marginTop: 4 },
  acciones: { flexDirection: "row", gap: 24, marginTop: 12 },
  accionEditar: { fontSize: 15, fontWeight: "700", color: colores.advertencia },
  peligro: { color: colores.error },
});
