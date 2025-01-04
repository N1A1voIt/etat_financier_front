import { TestBed } from '@angular/core/testing';

import { EtatFinancierService } from './etat-financier.service';

describe('EtatFinancierService', () => {
  let service: EtatFinancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatFinancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
