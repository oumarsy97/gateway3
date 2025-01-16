import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { ICommande } from '../commande.model';

@Component({
  selector: 'jhi-commande-detail',
  templateUrl: './commande-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class CommandeDetailComponent {
  commande = input<ICommande | null>(null);

  previousState(): void {
    window.history.back();
  }
}
