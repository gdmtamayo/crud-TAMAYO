import type { Videojuego } from "../entities/Videojuego";

export interface VideojuegoRepository {
  guardar(videojuego: Videojuego): Promise<void>;
  obtenerTodos(): Promise<Videojuego[]>;
  obtenerPorId(id: string): Promise<Videojuego | null>;
  actualizar(videojuego: Videojuego): Promise<void>;
  eliminar(id: string): Promise<void>;
}
