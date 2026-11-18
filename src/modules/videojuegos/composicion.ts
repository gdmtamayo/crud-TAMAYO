import { ActualizarVideojuego } from "./application/usecases/ActualizarVideojuego";
import { CrearVideojuego } from "./application/usecases/CrearVideojuego";
import { EliminarVideojuego } from "./application/usecases/EliminarVideojuego";
import { ObtenerVideojuegoPorId } from "./application/usecases/ObtenerVideojuegoPorId";
import { ObtenerVideojuegos } from "./application/usecases/ObtenerVideojuegos";
import { VideojuegoRepositorySupabase } from "./infrastructure/repositories/VideojuegoRepositorySupabase";

const repositorio = new VideojuegoRepositorySupabase();

export const crearVideojuego = new CrearVideojuego(repositorio);
export const obtenerVideojuegos = new ObtenerVideojuegos(repositorio);
export const obtenerVideojuegoPorId = new ObtenerVideojuegoPorId(repositorio);
export const actualizarVideojuego = new ActualizarVideojuego(repositorio);
export const eliminarVideojuego = new EliminarVideojuego(repositorio);
