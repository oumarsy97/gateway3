import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICategorie } from '../categorie.model';
import { CategorieService } from '../service/categorie.service';

@Component({
  templateUrl: './categorie-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CategorieDeleteDialogComponent {
  categorie?: ICategorie;

  protected categorieService = inject(CategorieService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categorieService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
