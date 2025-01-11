import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompteResultatComponent } from './form-compte-resultat.component';

describe('FormCompteResultatComponent', () => {
  let component: FormCompteResultatComponent;
  let fixture: ComponentFixture<FormCompteResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompteResultatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCompteResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
