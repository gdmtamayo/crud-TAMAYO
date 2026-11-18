import type { Videojuego } from "../../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";
import {
  limpiarDatos,
  validarVideojuego,
  type DatosVideojuego,
  type ErroresVideojuego,
} from "../../domain/rules/validarVideojuego";

export type ResultadoActualizarVideojuego =
  | { ok: true; videojuego: Videojuego }
  | { ok: false; errores: ErroresVideojuego };

export class ActualizarVideojuego {
  constructor(private readonly repositorio: VideojuegoRepository) {}

  async ejecutar(
    id: string,
    datos: DatosVideojuego,
  ): Promise<ResultadoActualizarVideojuego> {
    const limpios = limpiarDatos(datos);
    const errores = validarVideojuego(limpios);

    if (Object.keys(errores).length > 0) {
      return { ok: false, errores };
    }

    const videojuego: Videojuego = { id, ...limpios };
    await this.repositorio.actualizar(videojuego);
    return { ok: true, videojuego };
  }
}
