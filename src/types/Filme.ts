export type Filme = {
  id: string;
  nome: string;
  ano: number;
  idadeIndicativa: string;
  genero: string;
  diretor: string;
};

export type FilmeForm = Omit<Filme, "id">;
