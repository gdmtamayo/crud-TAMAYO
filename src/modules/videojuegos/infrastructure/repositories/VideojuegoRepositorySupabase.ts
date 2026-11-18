import { supabase } from "@/core/supabase/cliente";
import type { Videojuego } from "../../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../../domain/ports/VideojuegoRepository";

const TABLA = "videojuegos";

type FilaVideojuego = {
  id: string;
  titulo: string;
  descripcion: string;
  genero: string;
  plataforma: string;
};

function aEntidad(fila: FilaVideojuego): Videojuego {
  return {
    id: fila.id,
    titulo: fila.titulo,
    descripcion: fila.descripcion,
    genero: fila.genero,
    plataforma: fila.plataforma,
  };
}

function aFila(videojuego: Videojuego): FilaVideojuego {
  return {
    id: videojuego.id,
    titulo: videojuego.titulo,
    descripcion: videojuego.descripcion,
    genero: videojuego.genero,
    plataforma: videojuego.plataforma,
  };
}

export class VideojuegoRepositorySupabase implements VideojuegoRepository {
  async obtenerTodos(): Promise<Videojuego[]> {
    const { data, error } = await supabase.from(TABLA).select("*");
    if (error) throw new Error(error.message);
    return (data ?? []).map(aEntidad);
  }

  async obtenerPorId(id: string): Promise<Videojuego | null> {
    const { data, error } = await supabase
      .from(TABLA)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? aEntidad(data) : null;
  }

  async guardar(videojuego: Videojuego): Promise<void> {
    const { error } = await supabase.from(TABLA).insert(aFila(videojuego));
    if (error) throw new Error(error.message);
  }

  async actualizar(videojuego: Videojuego): Promise<void> {
    const { data, error } = await supabase
      .from(TABLA)
      .update(aFila(videojuego))
      .eq("id", videojuego.id)
      .select("id");

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      throw new Error(
        "No se actualizó ninguna fila: el videojuego no existe o falta la política RLS.",
      );
    }
  }

  async eliminar(id: string): Promise<void> {
    const { data, error } = await supabase
      .from(TABLA)
      .delete()
      .eq("id", id)
      .select("id");

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      throw new Error(
        "No se eliminó ninguna fila: el videojuego no existe o falta la política RLS.",
      );
    }
  }
}
