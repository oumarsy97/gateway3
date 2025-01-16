import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../produit-commande.test-samples';

import { ProduitCommandeFormService } from './produit-commande-form.service';

describe('ProduitCommande Form Service', () => {
  let service: ProduitCommandeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitCommandeFormService);
  });

  describe('Service methods', () => {
    describe('createProduitCommandeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProduitCommandeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qte: expect.any(Object),
            prixUnitaire: expect.any(Object),
            commande: expect.any(Object),
            produit: expect.any(Object),
          }),
        );
      });

      it('passing IProduitCommande should create a new form with FormGroup', () => {
        const formGroup = service.createProduitCommandeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qte: expect.any(Object),
            prixUnitaire: expect.any(Object),
            commande: expect.any(Object),
            produit: expect.any(Object),
          }),
        );
      });
    });

    describe('getProduitCommande', () => {
      it('should return NewProduitCommande for default ProduitCommande initial value', () => {
        const formGroup = service.createProduitCommandeFormGroup(sampleWithNewData);

        const produitCommande = service.getProduitCommande(formGroup) as any;

        expect(produitCommande).toMatchObject(sampleWithNewData);
      });

      it('should return NewProduitCommande for empty ProduitCommande initial value', () => {
        const formGroup = service.createProduitCommandeFormGroup();

        const produitCommande = service.getProduitCommande(formGroup) as any;

        expect(produitCommande).toMatchObject({});
      });

      it('should return IProduitCommande', () => {
        const formGroup = service.createProduitCommandeFormGroup(sampleWithRequiredData);

        const produitCommande = service.getProduitCommande(formGroup) as any;

        expect(produitCommande).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProduitCommande should not enable id FormControl', () => {
        const formGroup = service.createProduitCommandeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProduitCommande should disable id FormControl', () => {
        const formGroup = service.createProduitCommandeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
