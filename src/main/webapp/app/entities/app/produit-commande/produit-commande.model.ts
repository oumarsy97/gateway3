import { ICommande } from 'app/entities/app/commande/commande.model';
import { IProduit } from 'app/entities/app/produit/produit.model';

export interface IProduitCommande {
  id: number;
  qte?: number | null;
  prixUnitaire?: number | null;
  commande?: Pick<ICommande, 'id'> | null;
  produit?: Pick<IProduit, 'id'> | null;
}

export type NewProduitCommande = Omit<IProduitCommande, 'id'> & { id: null };
