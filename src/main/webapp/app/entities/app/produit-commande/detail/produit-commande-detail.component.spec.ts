import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProduitCommandeDetailComponent } from './produit-commande-detail.component';

describe('ProduitCommande Management Detail Component', () => {
  let comp: ProduitCommandeDetailComponent;
  let fixture: ComponentFixture<ProduitCommandeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCommandeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./produit-commande-detail.component').then(m => m.ProduitCommandeDetailComponent),
              resolve: { produitCommande: () => of({ id: 1566 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProduitCommandeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitCommandeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load produitCommande on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProduitCommandeDetailComponent);

      // THEN
      expect(instance.produitCommande()).toEqual(expect.objectContaining({ id: 1566 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
