import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataFinanceComponent } from './form-data-finance.component';

describe('FormDataFinanceComponent', () => {
  let component: FormDataFinanceComponent;
  let fixture: ComponentFixture<FormDataFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDataFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
