import { ICategorie } from 'app/entities/app/categorie/categorie.model';
import { EtatProduit } from 'app/entities/enumerations/etat-produit.model';

export interface IProduit {
  id: number;
  libelle?: string | null;
  prixUnitaire?: number | null;
  qte?: number | null;
  description?: string | null;
  etat?: keyof typeof EtatProduit | null;
  categorie?: Pick<ICategorie, 'id'> | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
