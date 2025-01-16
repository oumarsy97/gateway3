import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProduitCommande } from '../produit-commande.model';
import { ProduitCommandeService } from '../service/produit-commande.service';

const produitCommandeResolve = (route: ActivatedRouteSnapshot): Observable<null | IProduitCommande> => {
  const id = route.params.id;
  if (id) {
    return inject(ProduitCommandeService)
      .find(id)
      .pipe(
        mergeMap((produitCommande: HttpResponse<IProduitCommande>) => {
          if (produitCommande.body) {
            return of(produitCommande.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default produitCommandeResolve;
