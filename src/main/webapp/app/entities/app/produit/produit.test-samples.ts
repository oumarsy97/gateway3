import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 10819,
  libelle: 'avoir agréable broum',
};

export const sampleWithPartialData: IProduit = {
  id: 7631,
  libelle: 'franco',
  prixUnitaire: 9141.32,
  qte: 7950,
  description: 'mairie',
};

export const sampleWithFullData: IProduit = {
  id: 2644,
  libelle: 'en plus de comme aïe',
  prixUnitaire: 23324.46,
  qte: 7912,
  description: "à l'instar de jeune enfant",
  etat: 'PAS_NEUF',
};

export const sampleWithNewData: NewProduit = {
  libelle: 'agréable loufoque',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
