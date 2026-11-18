import type { Videojuego } from "../../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";

export class ObtenerVideojuegos {
  constructor(private readonly repositorio: VideojuegoRepository) {}

  async ejecutar(): Promise<Videojuego[]> {
    const videojuegos = await this.repositorio.obtenerTodos();
    return [...videojuegos].sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }
}
