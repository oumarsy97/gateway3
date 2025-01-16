import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommande } from 'app/entities/app/commande/commande.model';
import { CommandeService } from 'app/entities/app/commande/service/commande.service';
import { IProduit } from 'app/entities/app/produit/produit.model';
import { ProduitService } from 'app/entities/app/produit/service/produit.service';
import { ProduitCommandeService } from '../service/produit-commande.service';
import { IProduitCommande } from '../produit-commande.model';
import { ProduitCommandeFormGroup, ProduitCommandeFormService } from './produit-commande-form.service';

@Component({
  selector: 'jhi-produit-commande-update',
  templateUrl: './produit-commande-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProduitCommandeUpdateComponent implements OnInit {
  isSaving = false;
  produitCommande: IProduitCommande | null = null;

  commandesSharedCollection: ICommande[] = [];
  produitsSharedCollection: IProduit[] = [];

  protected produitCommandeService = inject(ProduitCommandeService);
  protected produitCommandeFormService = inject(ProduitCommandeFormService);
  protected commandeService = inject(CommandeService);
  protected produitService = inject(ProduitService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProduitCommandeFormGroup = this.produitCommandeFormService.createProduitCommandeFormGroup();

  compareCommande = (o1: ICommande | null, o2: ICommande | null): boolean => this.commandeService.compareCommande(o1, o2);

  compareProduit = (o1: IProduit | null, o2: IProduit | null): boolean => this.produitService.compareProduit(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produitCommande }) => {
      this.produitCommande = produitCommande;
      if (produitCommande) {
        this.updateForm(produitCommande);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produitCommande = this.produitCommandeFormService.getProduitCommande(this.editForm);
    if (produitCommande.id !== null) {
      this.subscribeToSaveResponse(this.produitCommandeService.update(produitCommande));
    } else {
      this.subscribeToSaveResponse(this.produitCommandeService.create(produitCommande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduitCommande>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produitCommande: IProduitCommande): void {
    this.produitCommande = produitCommande;
    this.produitCommandeFormService.resetForm(this.editForm, produitCommande);

    this.commandesSharedCollection = this.commandeService.addCommandeToCollectionIfMissing<ICommande>(
      this.commandesSharedCollection,
      produitCommande.commande,
    );
    this.produitsSharedCollection = this.produitService.addProduitToCollectionIfMissing<IProduit>(
      this.produitsSharedCollection,
      produitCommande.produit,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.commandeService
      .query()
      .pipe(map((res: HttpResponse<ICommande[]>) => res.body ?? []))
      .pipe(
        map((commandes: ICommande[]) =>
          this.commandeService.addCommandeToCollectionIfMissing<ICommande>(commandes, this.produitCommande?.commande),
        ),
      )
      .subscribe((commandes: ICommande[]) => (this.commandesSharedCollection = commandes));

    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduit[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduit[]) =>
          this.produitService.addProduitToCollectionIfMissing<IProduit>(produits, this.produitCommande?.produit),
        ),
      )
      .subscribe((produits: IProduit[]) => (this.produitsSharedCollection = produits));
  }
}
