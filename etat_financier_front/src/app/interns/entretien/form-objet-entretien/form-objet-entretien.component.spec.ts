import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjetEntretienComponent } from './form-objet-entretien.component';

describe('FormObjetEntretienComponent', () => {
  let component: FormObjetEntretienComponent;
  let fixture: ComponentFixture<FormObjetEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormObjetEntretienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormObjetEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
