import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProduitCommande, NewProduitCommande } from '../produit-commande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduitCommande for edit and NewProduitCommandeFormGroupInput for create.
 */
type ProduitCommandeFormGroupInput = IProduitCommande | PartialWithRequiredKeyOf<NewProduitCommande>;

type ProduitCommandeFormDefaults = Pick<NewProduitCommande, 'id'>;

type ProduitCommandeFormGroupContent = {
  id: FormControl<IProduitCommande['id'] | NewProduitCommande['id']>;
  qte: FormControl<IProduitCommande['qte']>;
  prixUnitaire: FormControl<IProduitCommande['prixUnitaire']>;
  commande: FormControl<IProduitCommande['commande']>;
  produit: FormControl<IProduitCommande['produit']>;
};

export type ProduitCommandeFormGroup = FormGroup<ProduitCommandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProduitCommandeFormService {
  createProduitCommandeFormGroup(produitCommande: ProduitCommandeFormGroupInput = { id: null }): ProduitCommandeFormGroup {
    const produitCommandeRawValue = {
      ...this.getFormDefaults(),
      ...produitCommande,
    };
    return new FormGroup<ProduitCommandeFormGroupContent>({
      id: new FormControl(
        { value: produitCommandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      qte: new FormControl(produitCommandeRawValue.qte),
      prixUnitaire: new FormControl(produitCommandeRawValue.prixUnitaire),
      commande: new FormControl(produitCommandeRawValue.commande, {
        validators: [Validators.required],
      }),
      produit: new FormControl(produitCommandeRawValue.produit, {
        validators: [Validators.required],
      }),
    });
  }

  getProduitCommande(form: ProduitCommandeFormGroup): IProduitCommande | NewProduitCommande {
    return form.getRawValue() as IProduitCommande | NewProduitCommande;
  }

  resetForm(form: ProduitCommandeFormGroup, produitCommande: ProduitCommandeFormGroupInput): void {
    const produitCommandeRawValue = { ...this.getFormDefaults(), ...produitCommande };
    form.reset(
      {
        ...produitCommandeRawValue,
        id: { value: produitCommandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProduitCommandeFormDefaults {
    return {
      id: null,
    };
  }
}
