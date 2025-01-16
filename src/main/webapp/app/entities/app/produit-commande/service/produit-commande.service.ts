import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduitCommande, NewProduitCommande } from '../produit-commande.model';

export type PartialUpdateProduitCommande = Partial<IProduitCommande> & Pick<IProduitCommande, 'id'>;

export type EntityResponseType = HttpResponse<IProduitCommande>;
export type EntityArrayResponseType = HttpResponse<IProduitCommande[]>;

@Injectable({ providedIn: 'root' })
export class ProduitCommandeService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produit-commandes', 'app');

  create(produitCommande: NewProduitCommande): Observable<EntityResponseType> {
    return this.http.post<IProduitCommande>(this.resourceUrl, produitCommande, { observe: 'response' });
  }

  update(produitCommande: IProduitCommande): Observable<EntityResponseType> {
    return this.http.put<IProduitCommande>(`${this.resourceUrl}/${this.getProduitCommandeIdentifier(produitCommande)}`, produitCommande, {
      observe: 'response',
    });
  }

  partialUpdate(produitCommande: PartialUpdateProduitCommande): Observable<EntityResponseType> {
    return this.http.patch<IProduitCommande>(`${this.resourceUrl}/${this.getProduitCommandeIdentifier(produitCommande)}`, produitCommande, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduitCommande>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduitCommande[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProduitCommandeIdentifier(produitCommande: Pick<IProduitCommande, 'id'>): number {
    return produitCommande.id;
  }

  compareProduitCommande(o1: Pick<IProduitCommande, 'id'> | null, o2: Pick<IProduitCommande, 'id'> | null): boolean {
    return o1 && o2 ? this.getProduitCommandeIdentifier(o1) === this.getProduitCommandeIdentifier(o2) : o1 === o2;
  }

  addProduitCommandeToCollectionIfMissing<Type extends Pick<IProduitCommande, 'id'>>(
    produitCommandeCollection: Type[],
    ...produitCommandesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const produitCommandes: Type[] = produitCommandesToCheck.filter(isPresent);
    if (produitCommandes.length > 0) {
      const produitCommandeCollectionIdentifiers = produitCommandeCollection.map(produitCommandeItem =>
        this.getProduitCommandeIdentifier(produitCommandeItem),
      );
      const produitCommandesToAdd = produitCommandes.filter(produitCommandeItem => {
        const produitCommandeIdentifier = this.getProduitCommandeIdentifier(produitCommandeItem);
        if (produitCommandeCollectionIdentifiers.includes(produitCommandeIdentifier)) {
          return false;
        }
        produitCommandeCollectionIdentifiers.push(produitCommandeIdentifier);
        return true;
      });
      return [...produitCommandesToAdd, ...produitCommandeCollection];
    }
    return produitCommandeCollection;
  }
}
