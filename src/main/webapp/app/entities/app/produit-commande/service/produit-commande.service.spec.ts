import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IProduitCommande } from '../produit-commande.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../produit-commande.test-samples';

import { ProduitCommandeService } from './produit-commande.service';

const requireRestSample: IProduitCommande = {
  ...sampleWithRequiredData,
};

describe('ProduitCommande Service', () => {
  let service: ProduitCommandeService;
  let httpMock: HttpTestingController;
  let expectedResult: IProduitCommande | IProduitCommande[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProduitCommandeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ProduitCommande', () => {
      const produitCommande = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(produitCommande).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProduitCommande', () => {
      const produitCommande = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(produitCommande).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProduitCommande', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProduitCommande', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProduitCommande', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProduitCommandeToCollectionIfMissing', () => {
      it('should add a ProduitCommande to an empty array', () => {
        const produitCommande: IProduitCommande = sampleWithRequiredData;
        expectedResult = service.addProduitCommandeToCollectionIfMissing([], produitCommande);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produitCommande);
      });

      it('should not add a ProduitCommande to an array that contains it', () => {
        const produitCommande: IProduitCommande = sampleWithRequiredData;
        const produitCommandeCollection: IProduitCommande[] = [
          {
            ...produitCommande,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProduitCommandeToCollectionIfMissing(produitCommandeCollection, produitCommande);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProduitCommande to an array that doesn't contain it", () => {
        const produitCommande: IProduitCommande = sampleWithRequiredData;
        const produitCommandeCollection: IProduitCommande[] = [sampleWithPartialData];
        expectedResult = service.addProduitCommandeToCollectionIfMissing(produitCommandeCollection, produitCommande);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produitCommande);
      });

      it('should add only unique ProduitCommande to an array', () => {
        const produitCommandeArray: IProduitCommande[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const produitCommandeCollection: IProduitCommande[] = [sampleWithRequiredData];
        expectedResult = service.addProduitCommandeToCollectionIfMissing(produitCommandeCollection, ...produitCommandeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const produitCommande: IProduitCommande = sampleWithRequiredData;
        const produitCommande2: IProduitCommande = sampleWithPartialData;
        expectedResult = service.addProduitCommandeToCollectionIfMissing([], produitCommande, produitCommande2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produitCommande);
        expect(expectedResult).toContain(produitCommande2);
      });

      it('should accept null and undefined values', () => {
        const produitCommande: IProduitCommande = sampleWithRequiredData;
        expectedResult = service.addProduitCommandeToCollectionIfMissing([], null, produitCommande, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produitCommande);
      });

      it('should return initial array if no ProduitCommande is added', () => {
        const produitCommandeCollection: IProduitCommande[] = [sampleWithRequiredData];
        expectedResult = service.addProduitCommandeToCollectionIfMissing(produitCommandeCollection, undefined, null);
        expect(expectedResult).toEqual(produitCommandeCollection);
      });
    });

    describe('compareProduitCommande', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProduitCommande(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 1566 };
        const entity2 = null;

        const compareResult1 = service.compareProduitCommande(entity1, entity2);
        const compareResult2 = service.compareProduitCommande(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 1566 };
        const entity2 = { id: 16841 };

        const compareResult1 = service.compareProduitCommande(entity1, entity2);
        const compareResult2 = service.compareProduitCommande(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 1566 };
        const entity2 = { id: 1566 };

        const compareResult1 = service.compareProduitCommande(entity1, entity2);
        const compareResult2 = service.compareProduitCommande(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
