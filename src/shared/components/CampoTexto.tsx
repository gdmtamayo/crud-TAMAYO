import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { colores } from "../theme/colores";

type Props = TextInputProps & {
  etiqueta: string;
  error?: string;
};

export function CampoTexto({ etiqueta, error, style, ...resto }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        accessibilityLabel={etiqueta}
        placeholderTextColor={colores.textoSuave}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...resto}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { gap: 4 },
  etiqueta: { fontSize: 14, fontWeight: "600", color: colores.texto },
  input: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colores.texto,
  },
  inputError: { borderColor: colores.error },
  error: { fontSize: 13, color: colores.error },
});
