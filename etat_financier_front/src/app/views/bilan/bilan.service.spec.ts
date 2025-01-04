import { TestBed } from '@angular/core/testing';

import { BilanService } from './bilan.service';

describe('BilanService', () => {
  let service: BilanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
