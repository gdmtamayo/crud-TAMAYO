import type { Videojuego } from "../../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";

export class ObtenerVideojuegoPorId {
  constructor(private readonly repositorio: VideojuegoRepository) {}

  async ejecutar(id: string): Promise<Videojuego | null> {
    return this.repositorio.obtenerPorId(id);
  }
}
