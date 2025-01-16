import dayjs from 'dayjs/esm';
import { etatCommande } from 'app/entities/enumerations/etat-commande.model';

export interface ICommande {
  id: number;
  ref?: string | null;
  montant?: number | null;
  dateCommande?: dayjs.Dayjs | null;
  etat?: keyof typeof etatCommande | null;
}

export type NewCommande = Omit<ICommande, 'id'> & { id: null };
