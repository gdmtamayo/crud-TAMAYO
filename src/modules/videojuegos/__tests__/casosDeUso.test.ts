import { ActualizarVideojuego } from "../application/usecases/ActualizarVideojuego";
import { CrearVideojuego } from "../application/usecases/CrearVideojuego";
import { EliminarVideojuego } from "../application/usecases/EliminarVideojuego";
import { ObtenerVideojuegoPorId } from "../application/usecases/ObtenerVideojuegoPorId";
import { ObtenerVideojuegos } from "../application/usecases/ObtenerVideojuegos";
import type { Videojuego } from "../domain/entities/Videojuego";
import type { VideojuegoRepository } from "../domain/ports/VideojuegoRepository";

class RepositorioEnMemoria implements VideojuegoRepository {
  videojuegos: Videojuego[] = [];

  async guardar(videojuego: Videojuego) {
    this.videojuegos.push(videojuego);
  }

  async obtenerTodos() {
    return this.videojuegos;
  }

  async obtenerPorId(id: string) {
    return this.videojuegos.find((v) => v.id === id) ?? null;
  }

  async actualizar(videojuego: Videojuego) {
    this.videojuegos = this.videojuegos.map((v) =>
      v.id === videojuego.id ? videojuego : v,
    );
  }

  async eliminar(id: string) {
    this.videojuegos = this.videojuegos.filter((v) => v.id !== id);
  }
}

const datosValidos = {
  titulo: "The Legend of Zelda",
  descripcion: "Aventura épica en el reino abierto de Hyrule.",
  genero: "Aventura / RPG",
  plataforma: "Nintendo Switch",
};

describe("CrearVideojuego", () => {
  it("guarda un videojuego válido y le asigna un id", async () => {
    const repo = new RepositorioEnMemoria();
    const resultado = await new CrearVideojuego(repo).ejecutar(datosValidos);

    expect(resultado.ok).toBe(true);
    expect(repo.videojuegos).toHaveLength(1);
    expect(repo.videojuegos[0].id).not.toBe("");
    expect(repo.videojuegos[0].titulo).toBe("The Legend of Zelda");
  });

  it("no guarda si hay campos inválidos y devuelve los errores", async () => {
    const repo = new RepositorioEnMemoria();
    const resultado = await new CrearVideojuego(repo).ejecutar({
      ...datosValidos,
      titulo: "ab",
      genero: "",
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(Object.keys(resultado.errores).sort()).toEqual(["genero", "titulo"]);
    }
    expect(repo.videojuegos).toHaveLength(0);
  });

  it("elimina espacios sobrantes antes de guardar", async () => {
    const repo = new RepositorioEnMemoria();
    await new CrearVideojuego(repo).ejecutar({
      ...datosValidos,
      titulo: "  Free Fire  ",
    });

    expect(repo.videojuegos[0].titulo).toBe("Free Fire");
  });
});

describe("ObtenerVideojuegos", () => {
  it("devuelve los videojuegos en orden alfabético", async () => {
    const repo = new RepositorioEnMemoria();
    const crear = new CrearVideojuego(repo);
    await crear.ejecutar({ ...datosValidos, titulo: "Zelda" });
    await crear.ejecutar({ ...datosValidos, titulo: "Apex Legends" });

    const lista = await new ObtenerVideojuegos(repo).ejecutar();
    expect(lista.map((v) => v.titulo)).toEqual(["Apex Legends", "Zelda"]);
  });

  it("devuelve una lista vacía si no hay videojuegos", async () => {
    expect(await new ObtenerVideojuegos(new RepositorioEnMemoria()).ejecutar()).toEqual([]);
  });
});

describe("ObtenerVideojuegoPorId", () => {
  it("devuelve el videojuego si existe y null si no existe", async () => {
    const repo = new RepositorioEnMemoria();
    const creado = await new CrearVideojuego(repo).ejecutar(datosValidos);
    if (!creado.ok) throw new Error("No se pudo crear");

    const caso = new ObtenerVideojuegoPorId(repo);
    expect((await caso.ejecutar(creado.videojuego.id))?.titulo).toBe("The Legend of Zelda");
    expect(await caso.ejecutar("no-existe")).toBeNull();
  });
});

describe("ActualizarVideojuego", () => {
  it("cambia los datos del videojuego y conserva su id", async () => {
    const repo = new RepositorioEnMemoria();
    const creado = await new CrearVideojuego(repo).ejecutar(datosValidos);
    if (!creado.ok) throw new Error("No se pudo crear");

    const resultado = await new ActualizarVideojuego(repo).ejecutar(creado.videojuego.id, {
      ...datosValidos,
      titulo: "Tears of the Kingdom",
    });

    expect(resultado.ok).toBe(true);
    expect(repo.videojuegos).toHaveLength(1);
    expect(repo.videojuegos[0].id).toBe(creado.videojuego.id);
    expect(repo.videojuegos[0].titulo).toBe("Tears of the Kingdom");
  });

  it("no actualiza si los datos son inválidos", async () => {
    const repo = new RepositorioEnMemoria();
    const creado = await new CrearVideojuego(repo).ejecutar(datosValidos);
    if (!creado.ok) throw new Error("No se pudo crear");

    const resultado = await new ActualizarVideojuego(repo).ejecutar(creado.videojuego.id, {
      ...datosValidos,
      plataforma: "",
    });

    expect(resultado.ok).toBe(false);
    expect(repo.videojuegos[0].plataforma).toBe("Nintendo Switch");
  });
});

describe("EliminarVideojuego", () => {
  it("elimina solo el videojuego indicado", async () => {
    const repo = new RepositorioEnMemoria();
    const crear = new CrearVideojuego(repo);
    const a = await crear.ejecutar({ ...datosValidos, titulo: "Free Fire" });
    await crear.ejecutar({ ...datosValidos, titulo: "Parchís STAR" });
    if (!a.ok) throw new Error("No se pudo crear");

    await new EliminarVideojuego(repo).ejecutar(a.videojuego.id);
    expect(repo.videojuegos.map((v) => v.titulo)).toEqual(["Parchís STAR"]);
  });
});
