import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../theme/colores";

type Props = {
  titulo: string;
  onPress: () => void;
  cargando?: boolean;
};

export function Boton({ titulo, onPress, cargando = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={cargando}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.boton,
        (pressed || cargando) && styles.presionado,
      ]}
    >
      {cargando ? (
        <ActivityIndicator color={colores.sobrePrimario} />
      ) : (
        <Text style={styles.texto}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colores.primario,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  presionado: { opacity: 0.7 },
  texto: { color: colores.sobrePrimario, fontSize: 16, fontWeight: "600" },
});
