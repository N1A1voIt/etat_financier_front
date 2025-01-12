import { TestBed } from '@angular/core/testing';

import { CompteResultatService } from './compte-resultat.service';

describe('CompteResultatService', () => {
  let service: CompteResultatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteResultatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
