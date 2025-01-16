import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ProduitCommandeResolve from './route/produit-commande-routing-resolve.service';

const produitCommandeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/produit-commande.component').then(m => m.ProduitCommandeComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/produit-commande-detail.component').then(m => m.ProduitCommandeDetailComponent),
    resolve: {
      produitCommande: ProduitCommandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/produit-commande-update.component').then(m => m.ProduitCommandeUpdateComponent),
    resolve: {
      produitCommande: ProduitCommandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/produit-commande-update.component').then(m => m.ProduitCommandeUpdateComponent),
    resolve: {
      produitCommande: ProduitCommandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default produitCommandeRoute;
