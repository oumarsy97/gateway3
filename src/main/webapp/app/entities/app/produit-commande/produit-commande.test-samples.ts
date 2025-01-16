import { IProduitCommande, NewProduitCommande } from './produit-commande.model';

export const sampleWithRequiredData: IProduitCommande = {
  id: 31763,
};

export const sampleWithPartialData: IProduitCommande = {
  id: 452,
  prixUnitaire: 25821,
};

export const sampleWithFullData: IProduitCommande = {
  id: 2376,
  qte: 9072,
  prixUnitaire: 21289.13,
};

export const sampleWithNewData: NewProduitCommande = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
