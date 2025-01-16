import dayjs from 'dayjs/esm';

import { ICommande, NewCommande } from './commande.model';

export const sampleWithRequiredData: ICommande = {
  id: 3263,
  ref: 'population du Québec hors bien que',
  etat: 'EN_COURS',
};

export const sampleWithPartialData: ICommande = {
  id: 18223,
  ref: 'tsoin-tsoin suggérer gens',
  montant: 2346.72,
  etat: 'ANNULER',
};

export const sampleWithFullData: ICommande = {
  id: 32566,
  ref: 'plouf souhaiter',
  montant: 16653.36,
  dateCommande: dayjs('2025-01-13'),
  etat: 'ANNULER',
};

export const sampleWithNewData: NewCommande = {
  ref: 'camarade tant que',
  etat: 'LIVRER',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
