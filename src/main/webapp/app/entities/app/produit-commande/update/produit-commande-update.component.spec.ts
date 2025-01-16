import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICommande } from 'app/entities/app/commande/commande.model';
import { CommandeService } from 'app/entities/app/commande/service/commande.service';
import { IProduit } from 'app/entities/app/produit/produit.model';
import { ProduitService } from 'app/entities/app/produit/service/produit.service';
import { IProduitCommande } from '../produit-commande.model';
import { ProduitCommandeService } from '../service/produit-commande.service';
import { ProduitCommandeFormService } from './produit-commande-form.service';

import { ProduitCommandeUpdateComponent } from './produit-commande-update.component';

describe('ProduitCommande Management Update Component', () => {
  let comp: ProduitCommandeUpdateComponent;
  let fixture: ComponentFixture<ProduitCommandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let produitCommandeFormService: ProduitCommandeFormService;
  let produitCommandeService: ProduitCommandeService;
  let commandeService: CommandeService;
  let produitService: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProduitCommandeUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProduitCommandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProduitCommandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    produitCommandeFormService = TestBed.inject(ProduitCommandeFormService);
    produitCommandeService = TestBed.inject(ProduitCommandeService);
    commandeService = TestBed.inject(CommandeService);
    produitService = TestBed.inject(ProduitService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Commande query and add missing value', () => {
      const produitCommande: IProduitCommande = { id: 16841 };
      const commande: ICommande = { id: 10216 };
      produitCommande.commande = commande;

      const commandeCollection: ICommande[] = [{ id: 10216 }];
      jest.spyOn(commandeService, 'query').mockReturnValue(of(new HttpResponse({ body: commandeCollection })));
      const additionalCommandes = [commande];
      const expectedCollection: ICommande[] = [...additionalCommandes, ...commandeCollection];
      jest.spyOn(commandeService, 'addCommandeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ produitCommande });
      comp.ngOnInit();

      expect(commandeService.query).toHaveBeenCalled();
      expect(commandeService.addCommandeToCollectionIfMissing).toHaveBeenCalledWith(
        commandeCollection,
        ...additionalCommandes.map(expect.objectContaining),
      );
      expect(comp.commandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Produit query and add missing value', () => {
      const produitCommande: IProduitCommande = { id: 16841 };
      const produit: IProduit = { id: 28529 };
      produitCommande.produit = produit;

      const produitCollection: IProduit[] = [{ id: 28529 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduits = [produit];
      const expectedCollection: IProduit[] = [...additionalProduits, ...produitCollection];
      jest.spyOn(produitService, 'addProduitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ produitCommande });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduits.map(expect.objectContaining),
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const produitCommande: IProduitCommande = { id: 16841 };
      const commande: ICommande = { id: 10216 };
      produitCommande.commande = commande;
      const produit: IProduit = { id: 28529 };
      produitCommande.produit = produit;

      activatedRoute.data = of({ produitCommande });
      comp.ngOnInit();

      expect(comp.commandesSharedCollection).toContainEqual(commande);
      expect(comp.produitsSharedCollection).toContainEqual(produit);
      expect(comp.produitCommande).toEqual(produitCommande);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitCommande>>();
      const produitCommande = { id: 1566 };
      jest.spyOn(produitCommandeFormService, 'getProduitCommande').mockReturnValue(produitCommande);
      jest.spyOn(produitCommandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produitCommande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produitCommande }));
      saveSubject.complete();

      // THEN
      expect(produitCommandeFormService.getProduitCommande).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(produitCommandeService.update).toHaveBeenCalledWith(expect.objectContaining(produitCommande));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitCommande>>();
      const produitCommande = { id: 1566 };
      jest.spyOn(produitCommandeFormService, 'getProduitCommande').mockReturnValue({ id: null });
      jest.spyOn(produitCommandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produitCommande: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produitCommande }));
      saveSubject.complete();

      // THEN
      expect(produitCommandeFormService.getProduitCommande).toHaveBeenCalled();
      expect(produitCommandeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitCommande>>();
      const produitCommande = { id: 1566 };
      jest.spyOn(produitCommandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produitCommande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(produitCommandeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCommande', () => {
      it('Should forward to commandeService', () => {
        const entity = { id: 10216 };
        const entity2 = { id: 15466 };
        jest.spyOn(commandeService, 'compareCommande');
        comp.compareCommande(entity, entity2);
        expect(commandeService.compareCommande).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduit', () => {
      it('Should forward to produitService', () => {
        const entity = { id: 28529 };
        const entity2 = { id: 21239 };
        jest.spyOn(produitService, 'compareProduit');
        comp.compareProduit(entity, entity2);
        expect(produitService.compareProduit).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
