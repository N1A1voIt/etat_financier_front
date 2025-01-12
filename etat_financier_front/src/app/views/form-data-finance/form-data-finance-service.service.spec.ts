import { TestBed } from '@angular/core/testing';

import { FormDataFinanceServiceService } from './form-data-finance-service.service';

describe('FormDataFinanceServiceService', () => {
  let service: FormDataFinanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataFinanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
