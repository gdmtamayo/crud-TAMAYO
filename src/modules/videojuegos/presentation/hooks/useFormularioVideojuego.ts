import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import type {
  DatosVideojuego,
  ErroresVideojuego,
} from "../../domain/rules/validarVideojuego";
import {
  actualizarVideojuego,
  crearVideojuego,
  obtenerVideojuegoPorId,
} from "../../composicion";

const DATOS_VACIOS: DatosVideojuego = {
  titulo: "",
  descripcion: "",
  genero: "",
  plataforma: "",
};

export function useFormularioVideojuego(id?: string) {
  const router = useRouter();
  const [datos, setDatos] = useState<DatosVideojuego>(DATOS_VACIOS);
  const [errores, setErrores] = useState<ErroresVideojuego>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [cargando, setCargando] = useState(id !== undefined);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (id === undefined) return;
    obtenerVideojuegoPorId
      .ejecutar(id)
      .then((videojuego) => {
        if (videojuego) {
          setDatos({
            titulo: videojuego.titulo,
            descripcion: videojuego.descripcion,
            genero: videojuego.genero,
            plataforma: videojuego.plataforma,
          });
        } else {
          setErrorGeneral("Este videojuego ya no existe.");
        }
      })
      .catch(() => setErrorGeneral("No se pudo cargar el videojuego."))
      .finally(() => setCargando(false));
  }, [id]);

  function cambiar(campo: keyof DatosVideojuego, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
  }

  async function guardar() {
    setGuardando(true);
    setErrorGeneral(null);
    try {
      const resultado =
        id === undefined
          ? await crearVideojuego.ejecutar(datos)
          : await actualizarVideojuego.ejecutar(id, datos);

      if (!resultado.ok) {
        setErrores(resultado.errores);
        return;
      }

      router.back();
    } catch {
      setErrorGeneral("No se pudo guardar. Revisa tu internet e inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  return { datos, errores, errorGeneral, cargando, guardando, cambiar, guardar };
}
