import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import type { Videojuego } from "../../domain/entities/Videojuego";
import { eliminarVideojuego, obtenerVideojuegos } from "../../composicion";

export function useVideojuegos() {
  const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      setVideojuegos(await obtenerVideojuegos.ejecutar());
      setError(null);
    } catch {
      setError(
        "No se pudieron cargar los videojuegos. Revisa tu internet y el archivo .env.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void cargar();
    }, [cargar]),
  );

  async function refrescar() {
    setRefrescando(true);
    await cargar();
    setRefrescando(false);
  }

  async function eliminar(id: string): Promise<boolean> {
    try {
      await eliminarVideojuego.ejecutar(id);
      await cargar();
      return true;
    } catch {
      return false;
    }
  }

  return { videojuegos, cargando, refrescando, error, refrescar, eliminar };
}
