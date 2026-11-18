import type { Videojuego } from "../../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";
import {
  limpiarDatos,
  validarVideojuego,
  type DatosVideojuego,
  type ErroresVideojuego,
} from "../../domain/rules/validarVideojuego";

export type ResultadoCrearVideojuego =
  | { ok: true; videojuego: Videojuego }
  | { ok: false; errores: ErroresVideojuego };

function generarUuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class CrearVideojuego {
  constructor(private readonly repositorio: VideojuegoRepository) {}

  async ejecutar(datos: DatosVideojuego): Promise<ResultadoCrearVideojuego> {
    const limpios = limpiarDatos(datos);
    const errores = validarVideojuego(limpios);

    if (Object.keys(errores).length > 0) {
      return { ok: false, errores };
    }

    const videojuego: Videojuego = { id: generarUuid(), ...limpios };
    await this.repositorio.guardar(videojuego);
    return { ok: true, videojuego };
  }
}
