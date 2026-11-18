import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Boton } from "@/shared/components/Boton";
import { CampoTexto } from "@/shared/components/CampoTexto";
import { colores } from "@/shared/theme/colores";
import { useFormularioVideojuego } from "../hooks/useFormularioVideojuego";

type Props = {
  id?: string;
};

export function FormularioVideojuegoScreen({ id }: Props) {
  const { datos, errores, errorGeneral, cargando, guardando, cambiar, guardar } =
    useFormularioVideojuego(id);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colores.primario} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <CampoTexto
        etiqueta="Título"
        value={datos.titulo}
        onChangeText={(texto) => cambiar("titulo", texto)}
        error={errores.titulo}
        placeholder="Ej. The Legend of Zelda"
      />
      <CampoTexto
        etiqueta="Género"
        value={datos.genero}
        onChangeText={(texto) => cambiar("genero", texto)}
        error={errores.genero}
        placeholder="Ej. Aventura / RPG"
      />
      <CampoTexto
        etiqueta="Plataforma"
        value={datos.plataforma}
        onChangeText={(texto) => cambiar("plataforma", texto)}
        error={errores.plataforma}
        placeholder="Ej. Nintendo Switch, PC, PS5"
      />
      <CampoTexto
        etiqueta="Descripción"
        value={datos.descripcion}
        onChangeText={(texto) => cambiar("descripcion", texto)}
        error={errores.descripcion}
        placeholder="Breve descripción del juego..."
        multiline
        numberOfLines={4}
        style={styles.multilinea}
      />

      {errorGeneral ? <Text style={styles.errorGeneral}>{errorGeneral}</Text> : null}

      <Boton
        titulo={id === undefined ? "Guardar videojuego" : "Guardar cambios"}
        onPress={guardar}
        cargando={guardando}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  centro: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: "center",
    justifyContent: "center",
  },
  contenido: { padding: 16, gap: 16 },
  multilinea: { minHeight: 96, textAlignVertical: "top" },
  errorGeneral: { color: colores.error, fontSize: 14 },
});
