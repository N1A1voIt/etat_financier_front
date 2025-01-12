import { TestBed } from '@angular/core/testing';

import { RubriquesService } from './rubriques.service';

describe('RubriquesService', () => {
  let service: RubriquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubriquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
