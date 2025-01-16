import { ICategorie, NewCategorie } from './categorie.model';

export const sampleWithRequiredData: ICategorie = {
  id: 24162,
  libelle: 'groin groin à moins de',
};

export const sampleWithPartialData: ICategorie = {
  id: 2648,
  libelle: "à l'exception de",
};

export const sampleWithFullData: ICategorie = {
  id: 19936,
  libelle: 'parvenir',
  description: 'délégation de peur que arrêter',
};

export const sampleWithNewData: NewCategorie = {
  libelle: 'maigre jeune enfant',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
