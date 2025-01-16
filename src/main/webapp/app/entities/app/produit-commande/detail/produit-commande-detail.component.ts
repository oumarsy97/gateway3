import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IProduitCommande } from '../produit-commande.model';

@Component({
  selector: 'jhi-produit-commande-detail',
  templateUrl: './produit-commande-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ProduitCommandeDetailComponent {
  produitCommande = input<IProduitCommande | null>(null);

  previousState(): void {
    window.history.back();
  }
}
