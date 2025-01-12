import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateComponent } from './form-date.component';

describe('FormDateComponent', () => {
  let component: FormDateComponent;
  let fixture: ComponentFixture<FormDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
