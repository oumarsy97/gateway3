import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProduitCommande } from '../produit-commande.model';
import { ProduitCommandeService } from '../service/produit-commande.service';

@Component({
  templateUrl: './produit-commande-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProduitCommandeDeleteDialogComponent {
  produitCommande?: IProduitCommande;

  protected produitCommandeService = inject(ProduitCommandeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produitCommandeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
