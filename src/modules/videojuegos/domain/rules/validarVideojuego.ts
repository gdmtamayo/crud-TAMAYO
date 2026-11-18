import type { Videojuego } from "../entities/Videojuego";

export type DatosVideojuego = Omit<Videojuego, "id">;

export type ErroresVideojuego = Partial<Record<keyof DatosVideojuego, string>>;

export function validarVideojuego(datos: DatosVideojuego): ErroresVideojuego {
  const errores: ErroresVideojuego = {};

  if (datos.titulo.trim().length < 3) {
    errores.titulo = "El título debe tener al menos 3 caracteres.";
  }

  if (datos.descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  if (datos.genero.trim().length === 0) {
    errores.genero = "Escribe un género (por ejemplo: Acción / RPG).";
  }

  if (datos.plataforma.trim().length === 0) {
    errores.plataforma = "Escribe la plataforma (por ejemplo: PC, PS5, Android).";
  }

  return errores;
}

export function limpiarDatos(datos: DatosVideojuego): DatosVideojuego {
  return {
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
    genero: datos.genero.trim(),
    plataforma: datos.plataforma.trim(),
  };
}
