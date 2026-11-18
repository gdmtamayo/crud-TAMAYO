import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";

export class EliminarVideojuego {
  constructor(private readonly repositorio: VideojuegoRepository) {}

  async ejecutar(id: string): Promise<void> {
    await this.repositorio.eliminar(id);
  }
}
