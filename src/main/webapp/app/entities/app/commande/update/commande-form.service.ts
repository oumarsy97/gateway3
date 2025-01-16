import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICommande, NewCommande } from '../commande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommande for edit and NewCommandeFormGroupInput for create.
 */
type CommandeFormGroupInput = ICommande | PartialWithRequiredKeyOf<NewCommande>;

type CommandeFormDefaults = Pick<NewCommande, 'id'>;

type CommandeFormGroupContent = {
  id: FormControl<ICommande['id'] | NewCommande['id']>;
  ref: FormControl<ICommande['ref']>;
  montant: FormControl<ICommande['montant']>;
  dateCommande: FormControl<ICommande['dateCommande']>;
  etat: FormControl<ICommande['etat']>;
};

export type CommandeFormGroup = FormGroup<CommandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommandeFormService {
  createCommandeFormGroup(commande: CommandeFormGroupInput = { id: null }): CommandeFormGroup {
    const commandeRawValue = {
      ...this.getFormDefaults(),
      ...commande,
    };
    return new FormGroup<CommandeFormGroupContent>({
      id: new FormControl(
        { value: commandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ref: new FormControl(commandeRawValue.ref, {
        validators: [Validators.required],
      }),
      montant: new FormControl(commandeRawValue.montant),
      dateCommande: new FormControl(commandeRawValue.dateCommande),
      etat: new FormControl(commandeRawValue.etat, {
        validators: [Validators.required],
      }),
    });
  }

  getCommande(form: CommandeFormGroup): ICommande | NewCommande {
    return form.getRawValue() as ICommande | NewCommande;
  }

  resetForm(form: CommandeFormGroup, commande: CommandeFormGroupInput): void {
    const commandeRawValue = { ...this.getFormDefaults(), ...commande };
    form.reset(
      {
        ...commandeRawValue,
        id: { value: commandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommandeFormDefaults {
    return {
      id: null,
    };
  }
}
