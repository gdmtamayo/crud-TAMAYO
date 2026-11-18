import { useLocalSearchParams } from "expo-router";
import { FormularioVideojuegoScreen } from "@/modules/videojuegos/presentation/screens/FormularioVideojuegoScreen";

export default function EditarVideojuego() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <FormularioVideojuegoScreen id={id} />;
}
