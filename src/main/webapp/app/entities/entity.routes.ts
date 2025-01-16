import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'Authorities' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'categorie',
    data: { pageTitle: 'Categories' },
    loadChildren: () => import('./app/categorie/categorie.routes'),
  },
  {
    path: 'produit',
    data: { pageTitle: 'Produits' },
    loadChildren: () => import('./app/produit/produit.routes'),
  },
  {
    path: 'commande',
    data: { pageTitle: 'Commandes' },
    loadChildren: () => import('./app/commande/commande.routes'),
  },
  {
    path: 'produit-commande',
    data: { pageTitle: 'ProduitCommandes' },
    loadChildren: () => import('./app/produit-commande/produit-commande.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
