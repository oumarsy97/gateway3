export interface ICategorie {
  id: number;
  libelle?: string | null;
  description?: string | null;
}

export type NewCategorie = Omit<ICategorie, 'id'> & { id: null };
